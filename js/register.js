// -------------Add service worker-----------------------
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(reg => {
      //registration works
      if (reg.installing) {
        console.log('Service Worker installing');
      } else if (reg.waiting) {
        console.log('Service worker installed');
      } else if (reg.active) {
        console.log('Service worker active');
      }
      console.log("Successful registration of Service Worker: " + reg.scope);
    })
    .catch(error => {
      //registration failed
      console.log("Failed registration of Service Worker: " + error);
    });
}


