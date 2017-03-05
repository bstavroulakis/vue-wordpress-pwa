"use strict"

import Config from './app.config.js';

const cacheService = {
  localforage:"",
  store:"",
  storeCacheTime:"",
  currentTime:"",
  networkFirstStrategy: (context, path, cacheTime) => {
    return new Promise((resolve, reject) => {
      context.$http.get(path)
      .then(response => {
        //Response returned cache it and return it
        cacheService.storeCacheTime.setItem(path, cacheService.currentTime + cacheTime);
        cacheService.store.setItem(path, {body:response.body, headers:response.headers})
        .then(resolve(response))
        .catch((err) => reject(err));
      })
      .catch(error => {
        //Try cache to return latest state
        cacheService.store.getItem(path)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
      })
    });
  },
  offlineFirstStrategy: (context, path, cacheTime) => {
    return new Promise((resolve, reject) => {
      cacheService.storeCacheTime.getItem(path).then(function(timeLastCached){
        //Cache has expired
        if(timeLastCached < cacheService.currentTime){
          cacheService.networkFirstStrategy(context, path, cacheTime)
          .then((response) => {resolve(response)})
          .catch((err) => reject(err));
        }else{
          //Get item from cache
          cacheService.store.getItem(path)
          .then((response) => {
            if(response){
              //Is in cache perfect!
              resolve(response)
            }else{
              //Doesn't exist in cache try network
              cacheService.networkFirstStrategy(context, path, cacheTime)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
            }
          })
          .catch((err) => {
            //Doesn't exist in cache try network
            cacheService.networkFirstStrategy(context, path, cacheTime)
            .then((response) => resolve(response))
            .catch((err) => reject(err));
          });
        }
      }).catch((err) => {
        //Doesn't exist in cache timeouts try network
        cacheService.networkFirstStrategy(context, path, cacheTime)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
      })
    });
  },
  get: function(context, path, cacheTime) {
    return new Promise((resolve, reject) => {
      cacheService.currentTime = Math.floor(Date.now() / 1000);
      require.ensure(['localforage'], () => {
        cacheService.localforage = require('localforage');
        cacheService.store = cacheService.localforage.createInstance({
          name: Config.loadDbName
        });
        cacheService.storeCacheTime = cacheService.localforage.createInstance({
          name: Config.loadDbName + "_cacheTime"
        });

        if(!cacheTime){
          cacheService.networkFirstStrategy(context, path, 0)
          .then(response => {if(!response){reject()}else{resolve(response)}})
          .catch((err) => reject(err));
        }else{
          cacheService.offlineFirstStrategy(context, path, cacheTime)
          .then(response => {if(!response){reject()}else{resolve(response)}})
          .catch((err) => reject(err));
        }
      });
    })
  }
}


export default cacheService;