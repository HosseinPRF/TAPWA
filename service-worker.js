const CACHE = 'tapwa-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icon.svg'
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>k===CACHE?null:caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e=>{
  const req = e.request;
  // navigation fallback
  if(req.mode==='navigate'){
    e.respondWith(
      fetch(req).catch(()=>caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(res=> res || fetch(req).then(net=>{
      // cache-put for same-origin GETs
      if(req.method==='GET' && new URL(req.url).origin===location.origin){
        const copy = net.clone();
        caches.open(CACHE).then(c=>c.put(req, copy));
      }
      return net;
    }).catch(()=>caches.match('./index.html')))
  );
});
