function actualizaCacheDinamico( dynamicCache, req, res ) {

  if ( res.ok ) {
      
      return caches.open( dynamicCache ).then( cache => {
  
          cache.put( req, res.clone() );
  
          return res;
      });

  } else {
      return res;
  }


}


const STATIC_CACHE    = 'static-v0.1';
const DYNAMIC_CACHE   = 'dynamic-V0.1';
const INMUTABLE_CACHE = 'inmutable-V0.1';

const APP_SHELL = [
    './',
    './index.html',
    './style.css',
    './assets/ask.jpg',
    './assets/endian-wifi_features-secure.svg',
    './assets/news-svgrepo-com.svg',
    './assets/question-svgrepo-com.svg',
    './script.js'
];

const APP_SHELL_INMUTABLE = [
   // 'https://fonts.googleapis.com/css2?family=Rubik+Mono+One:300,400',
   // 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
    './style.css'
];



// Instalar
self.addEventListener('install', e => {

    
    const cacheStatic = caches.open( STATIC_CACHE ).then( cache =>
            cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then( cache =>
            cache.addAll( APP_SHELL_INMUTABLE ));

    self.skipWaiting();

    e.waitUntil( 
        Promise.all([cacheStatic,cacheInmutable])
    );

});



// Fetch y cache
self.addEventListener('fetch', e => {


    const respuesta = caches.match( e.request ).then( res => {

        if ( res ) {
            return res;
        } else {
            return fetch( e.request ).then( res => {
                return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, res );
            }).catch(e =>{
                console.log('Error en el FETCH!!!', e);
            });
        }


    });

    e.respondWith( respuesta );

});

// Activación

self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {
        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

        });

    });



    e.waitUntil( respuesta );

});