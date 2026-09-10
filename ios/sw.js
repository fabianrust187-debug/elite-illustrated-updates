const CACHE='elite-illustrated-ios-pwa-v1';
const SHELL=['./','./manifest.webmanifest','./assets/elite-app-icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).catch(()=>caches.match(event.request).then(r=>r||caches.match('./'))));});
self.addEventListener('push',event=>{let data={title:'ELITE Illustrated',body:'New content is available.'};try{if(event.data)data={...data,...event.data.json()};}catch(e){}event.waitUntil(self.registration.showNotification(data.title,{body:data.body,icon:'./assets/elite-app-icon.svg',badge:'./assets/elite-app-icon.svg',data:{url:data.url||'./'}}));});
self.addEventListener('notificationclick',event=>{event.notification.close();const url=event.notification.data?.url||'./';event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const client of list){if('focus' in client){client.navigate(url);return client.focus();}}return clients.openWindow?clients.openWindow(url):undefined;}));});
