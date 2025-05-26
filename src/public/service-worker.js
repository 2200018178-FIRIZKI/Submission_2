const CACHE_NAME = 'ruangkisah-shell-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/images/logo.png',
  // tambahkan file CSS/JS utama jika perlu
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

// Push Notification Handler
self.addEventListener('push', function(event) {
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {}
  const title = data.title || 'Story berhasil dibuat';
  const options = data.options || {
    body: 'Ada story baru!',
    icon: 'images/logo.png',
    badge: 'images/logo.png',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});