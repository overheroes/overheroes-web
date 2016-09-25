'use strict';

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open('overheroes').then(function (cache) {
    return cache.addAll(['/', '/index.html', '/heroes', '/css/overheroes.css', '/js/overheroes.js']);
  }));
});

// TODO: Pushnotification mit showcase einbauen?
self.addEventListener('push', function (event) {
  var title = 'Push message';
  event.waitUntil(self.registration.showNotification(title, {
    body: 'Overwatch',
    icon: 'icon.png',
    tag: '#overwatch'
  }));
});

self.addEventListener('fetch', function (event) {
  event.respondWith(caches.open('overheroes').then(function (cache) {
    return cache.match(event.request).then(function (response) {
      return response || fetch(event.request).then(function (response) {
        cache.put(event.request, response.clone());

        return response;
      });
    });
  }));
});
