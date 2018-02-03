"use strict"

const path = require('path')
const fs = require('fs-extra')
const md5 = require('md5')
const recursive = require('recursive-readdir');
const config = require(path.resolve(__dirname, '../src/app.config.js'));
const distFolder = 'dist/';
const dirPath = path.resolve(__dirname,'../' + distFolder);

const excludedFiles = ['([\\/|\\\\]server[\\/|\\\\].*)', '([\\/|\\\\]server\\.js)', '([\\/|\\\\]web\\.config)']
var excludedFilesRegExp = new RegExp(excludedFiles.join("|"), "gi");
var self = this;
self.assetFiles = [];
self.assetCacheHash = "";

const generateAssetHash = () => {
  return new Promise((resolve, reject) => {
    getAllAssets().then((assetFiles) => {
      self.assetFiles = assetFiles;
      self.assetCacheHash = md5(self.assetFiles.join(''));
      resolve();
    })
  });
}

const getAllAssets = () => {
  return new Promise((resolve, reject) => {
    var assetFiles = [];
    recursive(dirPath, (err, files) => {
      files.forEach(file => {
        var fileName = file.replace(dirPath, '')
        if (fileName.match(excludedFilesRegExp)) {
          return
        }
        assetFiles.push(getUrlPath(file));
      })
      resolve(assetFiles);
    });
  });
}

const getUrlPath = (str) => {
  return str.replace(dirPath,'').replace(/\\/gi,'/').replace(distFolder,'')
}

const generateSwConfigFile = () => {
  return new Promise((resolve, reject) => {
    var swConfigFilename = 'sw_config_' + self.assetCacheHash + '.js';
    fs.outputFile( (dirPath + "/" + swConfigFilename), 'var config = ' +  JSON.stringify({
      assets: self.assetFiles.concat('/offline-redirect/'),
      paths:{api:config.wpDomain + 'wp-json', remote:config.wpDomain, client: config.client},
      cacheNames:{assetCache:`vwpCacheAsset-${self.assetCacheHash}`, remoteCache:`vwpCacheRemote-${self.assetCacheHash}`}
    }), () => {
      resolve(swConfigFilename);
    });
  });
}

const copyServiceWorker = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname,'../src/service-worker.js'), "utf-8", function(err, data){
      fs.writeFile((dirPath + '/service-worker.js'), data, 'utf8', function(){
        resolve();
      });
    });
  });
}

const serviceWorker = () => {
  generateSwConfigFile().then((swConfigFilename) => {
    fs.readFile((dirPath + '/service-worker.js'), "utf-8", function(err, data){
      data = data.replace('sw_config.js', swConfigFilename).replace("{{assetCacheHash}}", self.assetCacheHash);
      fs.writeFile((dirPath + '/service-worker.js'), data, 'utf8');
    });
  })
}

const appCache = () => {
  fs.copySync(path.resolve(__dirname, '../index-appCache.html'), (dirPath + "/index-appCache.html"));
  fs.copySync(path.resolve(__dirname, '../src/assets/local.appcache'), (dirPath + "/assets/local.appcache"));
  fs.readFile((dirPath + "/assets/local.appcache"), "utf-8", function(err, data){
    data = data.replace("{{cachedFiles}}", self.assetFiles.join('\n')).replace("{{assetCacheHash}}", self.assetCacheHash);
    fs.writeFile((dirPath + "/assets/local.appcache"), data, 'utf8');
  });
}

const manifest = () => {
  fs.copySync(path.resolve(__dirname, '../src/assets/manifest.json'), (dirPath + "/assets/manifest.json"));
  fs.readFile((dirPath + "/assets/manifest.json"), "utf-8", function(err, data){
    data = data.replace("${config.appBgColor}", config.appBgColor)
    data = data.replace("${config.appDescription}", config.appDescription)
    data = data.replace("${config.appIcon}", config.client + config.appIcon)
    data = data.replace("${config.appTitle}", config.appTitle)
    data = data.replace("${config.appTitleShort}", config.appTitleShort)
    data = data.replace("${config.appThemeColor}", config.appThemeColor)
    fs.writeFile((dirPath + "/assets/manifest.json"), data, 'utf8');
  });
  console.log("Manifest Done")
}

const cleanIndex = () => {
  fs.readFile((dirPath + "/index.html"), "utf-8", function(err, data){
    data = data.replace(
      '<link rel="stylesheet" href="/assets/styles.css">',
      ""
    );
    data = data.replace(
      '<link href="/assets/styles.css" rel="stylesheet">',
      ""
    );
    data = data.replace(
      '<link media="all" rel="stylesheet" href="/assets/styles.css" media="all">',
      ""
    );
    data = data.replace(/type="text\/javascript"/gim, 'defer type="text/javascript"');
    data = data.replace(/rel="stylesheet"/gim, 'media="all" rel="stylesheet"');
    fs.writeFile((dirPath + "/index.html"), data, 'utf8');
    /* return new Promise((resolve, reject) => {
      self.assetFiles.forEach(file => {
        if (file.match(/styles\..*?\.css$/)) {
          _exec(`purifycss ${dirPath}${file} ${dirPath}/assets/js/app.js --min --info --out ${dirPath}${file}`);
        }
        resolve();
      })
    }) */
  });
}

const exec = () => {
  generateAssetHash()
  .then(() => copyServiceWorker())
  .then(() => {
    serviceWorker();
    appCache();
    manifest();
    cleanIndex();
  })
}

exports.exec = exec;
