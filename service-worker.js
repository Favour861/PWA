var cacheName = 'pwa-sample';
var fileToCache = ['./cinema.html','./cinema.css','./furniture.jpg'];

// load files into cache
self.addEventListener("install", function(e){
	e.waitUntil(
		caches.open(cacheName).then(function(cache){
			console.log("[serviceWorker] Caching app shell");
			return cache.addAll(fileToCache);
		})
		);
});

//deleting old cache upon presence of internet
// confirmation = confirm("Do you want to Update theh page?");
// if(confirmation){
self.addEventListener("activate",function(e){
	console.log("[serviceWorker] Activated");
	e.waitUntil(
		caches.keys().then(function(keyList){
			return Promise.all(
				keyList.map(function(key){
					if(key == cacheName){
						console.log("[serviceWorker] Removing Caches", key);
						return caches.delete(key);
					}
					
				})
				)
		})
		)
	return self.client.claim();
})
// }

//displaying offline
self.addEventListener("fetch", function(e){
	console.log("[serviceWorker] Fetch");
	e.respondWith(
		caches.match(e.request).then(function(response){
			return response || fetch(e.request);
		})
		)
})