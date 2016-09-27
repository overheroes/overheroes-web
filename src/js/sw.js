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