"use strict";

self.importScripts('/sw_config.js');

var expectedCaches = [config.cacheNames.assetCache, config.cacheNames.remoteCache]

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(config.cacheNames.assetCache)
    .then(function(cache){
      return cache.addAll(config.assets)
    })
  );
});

self.addEventListener('activate', function(event) {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(function(cacheName) {
      return Promise.all(
        cacheName.filter(n => expectedCaches.indexOf(n) == -1)
          .map(n => caches.delete(n))
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);
  var requestPath = requestUrl.pathname;
  var fileName = requestPath.substring(requestPath.lastIndexOf('/')+1);
  
  if(stringContains(requestUrl.href, config.paths.api) 
    || fileName == "sw.js" 
    || fileName == "index.html"
    || requestPath == "/"){
    event.respondWith(fetch(event.request));
  }else if(stringContains(requestUrl.href, config.paths.remote)){
    event.respondWith(networkFirstStrategy(event.request));
  }else if(requestPath == config.paths.assetCache){
    event.respondWith(cacheFirstStrategy(event.request));
  }else{
    event.respondWith(fetch(event.request));
  }
});

function cacheFirstStrategy(request){
  return caches.match(request).then(function(cacheResponse){
    return cacheResponse || fetchRequestAndCache(request);
  });
}

function networkFirstStrategy(request){
  return fetchRequestAndCache(request).catch(function(response){
    return caches.match(request);
  })
}

function fetchRequestAndCache(request){
    return fetch(request).then(function(networkResponse){
      caches.open(getCacheName(request)).then(function(cache) {
        cache.put(request, networkResponse);
      })
      return networkResponse.clone();
    });
}

function getCacheName(request){
  if(stringContains(request.url, config.paths.remote)){
    return config.cacheNames.remoteCache;
  }else{
    return config.cacheNames.assetCache;
  }
}

function stringContains(str, search){
  return str.indexOf(search) !== -1
}

//"{{assetCacheHash}}"