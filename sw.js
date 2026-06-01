const V='pos-1780293286';
const ASSETS=['./', './index.html', './manifest.json'];
self.addEventListener('install', e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS).catch(()=>{})));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  if(!e.request.url.startsWith('http'))return;
  e.respondWith(fetch(e.request).then(r=>{
    if(r&&r.status===200){const c=r.clone();caches.open(V).then(cache=>cache.put(e.request,c));}
    return r;
  }).catch(()=>caches.match(e.request)));
});