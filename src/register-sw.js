
var GLOBALRegisterSWEvents = function(){
  navigator.serviceWorker.controller.postMessage(
      {
          action:'setCurrentDomain', 
          data:window.location.protocol + "//" + window.location.host + "/"
      }
  );
  navigator.serviceWorker.controller.postMessage(
      {
          action:'cachePage', 
          data:window.location.protocol + "//" + window.location.host + window.location.pathname
      }
  );

  navigator.serviceWorker.controller.postMessage(
      {
          action:'cachePage', 
          data:window.location.protocol + "//" + window.location.host + "/"
      }
  )
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register("/service-worker.js", {scope:''})
  .then(function(swRegistration) { 
    
    var serviceWorker;

    if(swRegistration.installing){
      console.log('Resolved at installing:  ', swRegistration);
      serviceWorker = swRegistration.installing;
    } else if (swRegistration.waiting){
      console.log('Resolved at installed/waiting: ', swRegistration);
      serviceWorker = swRegistration.waiting; 
    } else if (swRegistration.active){
      console.log('Resolved at activated: ', swRegistration);
      serviceWorker = swRegistration.active; 
      GLOBALRegisterSWEvents();
    }

    if (serviceWorker) {
      serviceWorker.addEventListener('statechange', function (e) {
          console.log(e.target.state);
      });
    }

    swRegistration.addEventListener('updatefound', function(e){
      swRegistration.installing.addEventListener('statechange', function (e) {
          console.log("New service worker state: ", e.target.state);
          if(e.target.state == 'activated'){
            GLOBALRegisterSWEvents();
          }
      });
      console.log("New service worker found!", swRegistration)
    });

    //Check for an update every hour
    /*setInterval(function(){
      swRegistration.update();
    },1000*60*60);*/

  }).catch(function(error) {
    console.log('Error occurred', error);
  });
  
  //An extra event that is fired when the service worker controlling this page changes
  //through the self.skipWaiting()
  navigator.serviceWorker.addEventListener('controllerchange', function(e){
    console.log("Controller Changed!");
  });
}