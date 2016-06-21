console.log('Started', self);
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('overheroes').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/heroes',
                '/css/overheroes.css',
                '/js/overheroes.js',
                'https://overwatch-data.herokuapp.com/img/heroes/bastion/bastion.png'
            ]);
        })
    );
});
self.addEventListener('activate', function(event) {
    console.log('Activated', event);
});
self.addEventListener('push', function(event) {
    console.log('Push message received', event);
    // TODO
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open('overheroes').then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
            });
        })
    );
});