var cacheName = 'numberstack';
var filesToCache = [
	'index.html',
	'img/bow.png',
	'img/violin2.svg',
	'img/asadsong.mp3',

];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
    caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
    }));
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
    caches.match(event.request, {
        ignoreSearch: true
    }).then( function(response)  {
        return response || fetch(event.request);
    }));
});