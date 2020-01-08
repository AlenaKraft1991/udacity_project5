var fixedCacheName = 'restaurant-cache';
var cacheFiles = [
    "/",
    "/index.html",
    "/restaurant.html",
    "/css/styles.css",
    "/js/dbhelper.js",
    "/js/main.js",
    "/js/restaurant_info.js",
    "/js/register.js",
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/4.jpg",
    "/img/5.jpg",
    "/img/6.jpg",
    "/img/7.jpg",
    "/img/8.jpg",
    "/img/9.jpg",
    "/img/10.jpg",
];

// Add three event listeners for the different states of the service worker: install, activate and fetch.
selfaddEventListener('install', function (event) {
    console.log("Service worker installed"); 
    event.waitUntil(
        caches.open(fixedCacheName).then(function (cache) {
            console.log(cache);
            return cache.addAll(cacheFiles);
        })
    );
});

selfaddEventListener('active', function (event) {
    console.log("Service worker activated");
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != fixedCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

selfaddEventListener('fetch', function (event) {
    console.log("Service worker fetching"); 
    event.respondWith(
        caches.match(event.request).then(function (response) {

            if (response) {
					console.log("Service worker available", event.request.url);
					return response;
				}
				return fetch(event.request);
			})	
	)
})