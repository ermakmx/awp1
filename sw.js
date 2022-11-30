// //asignar nombre y version cache

// const CACHE_NAME = 'v1.cache.AWP';

// var urlToCache = [
//     './',
//     './css/style.css',
//     './images/1.png',
//     './images/2.png'
// ]

// // Evento Install

// self.addEventListener('install', e=>{
// e.waitUntil(
//     caches.open(CACHE_NAME)
//     .then( cache =>{
//         return cache.addAll(urlToCache)
//         .then(()=>{
//             self.skipWaiting();
//         })
//     })
//     .catch(err =>{
//         console.log('No se ha registrado el cache', err);
//     })
// )

// })
// // Evento de activacion

// self.addEventListener('activate', e=>{
//     const cacheWhiteList = [CACHE_NAME];
//     e.waitUntil(
//         cache.keys()
//             .then( cacheNames =>{
//                 return Promise.all(
//                     cacheNames.map(cacheName =>{
//                         if (cacheWhiteList.indexOf(cacheName) === -1) {
//                             // borrar los elementos que no se necesitan
//                             return caches.delete(cacheName);
                            
//                         }
//                     })
//                 )
//             })
//             .then(()=>{
//                 //activar el cache
//                 self.clients.claim();
//             })
//     )

// })
// //evento fetch 

// self.addEventListener('fetch', e=>{
//     e.responseWith(
//         caches.match(e.request)
//         .then(res=>{
//             if (res) {
//                 //devuelvo los datos desde cache
//                 return res;
//             }
//             return fetch(e.request);
//         })
//     )
// })

console.log("entra");

const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
  };
  
  self.addEventListener("install", (event) => { 
    event.waitUntil(
      addResourcesToCache([
        "/",
        "/index.html",
        "/style.css",
        "/script.js",
        "/comenzar.html",
        "/star-wars-logo.jpg",
        "/assets/ask.jpg",
        "/assets/endian-wifi_features-secure.svg",
        "/assets/news-svgrepo-com.svg",
        "/assets/question-svgrepo-com.svg",
      ])
    );
  });
  

  self.addEventListener('fetch', (e) => {
    console.log(`fetch resultado ${e.request.url}`);
  })