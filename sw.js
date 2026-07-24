/* Carnet de pêche — service worker.
   Incrémente VERSION à chaque mise à jour du site pour forcer le rafraîchissement. */
const VERSION = "v1";
const CACHE = "carnet-" + VERSION;
const FICHIERS = [
  "./", "./index.html", "./manifest.json",
  "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;

  // Météo : réseau uniquement, jamais de cache (et échec silencieux hors ligne)
  if (url.hostname.endsWith("open-meteo.com")) return;

  // Coquille de l'app : cache d'abord, réseau en secours
  e.respondWith(
    caches.match(e.request).then(rep => rep || fetch(e.request).then(r => {
      if (r.ok && url.origin === location.origin) {
        const copie = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, copie));
      }
      return r;
    }).catch(() => caches.match("./index.html")))
  );
});
