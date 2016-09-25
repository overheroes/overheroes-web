self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('overheroes')
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/heroes',
        '/css/overheroes.css',
        '/js/overheroes.js'
      ]))
  );
});

// TODO: Pushnotification mit showcase einbauen?
self.addEventListener('push', event => {
  var title = 'Push message';
  event.waitUntil(self.registration.showNotification(
    title,
    {
      body: 'Overwatch',
      icon: 'icon.png',
      tag: '#overwatch'
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('overheroes')
      .then(cache => cache.match(event.request)
        .then(response => {
          return response || fetch(event.request)
            .then(response => {
              cache.put(event.request, response.clone());

              return response;
            });
        })
      )
  );
});