// Compatibility service worker for visitors with the former PWA registration.
// It intentionally does not intercept requests or cache application responses.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
