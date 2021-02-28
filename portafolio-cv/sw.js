// asignar un nombre y version al cache 
const CACHE_NAME = 'v1_cache_portafolio_victor_guerrero',
urlsToCache = ['./',
'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap',
'https://fonts.gstatic.com',
'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
'./style.css',
'./script.js',
'./assets/PortafolioVictorGuerrero.png',
'./assets/favicon.png'
];

//durante la fase de instalacion, generalmente se almacena en cache los activos estaticos
self.addEventListener('install', e=>{

  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache =>{
      return cache.addAll(urlsToCache)
      .then(()=>{
        self.skip.Waiting()

      })
    }).catch(err => console.log("Fallo registro de cache", err))
  );

});

// una vez que se instala el sw, se activa y busca los recursos para hacer que funcione sin conexion
self.addEventListener('activate' ,e=>{
const cacheWhitelist = [CACHE_NAME]
e.waitUntil(
  caches.keys()
  .then(cachesNames=>{

    cachesNames.map(cachesName =>{
      //eliminamos lo que ya no se necesite en cache

      if (cacheWhitelist.indexOf(cachesName) === -1){

        return cache.delete(cachesName)
      }

    })
  })
  //le indica el sw activar el cache actual
  .then(()=> self.clients.claim())

)

});

//cuando el navegador recupera una url
self.addEventListener('fetch',  e=>{
// responde ya sea con el objeto en cache  continuar y buscar la url real.
caches.match(e.request)
.then(res=>{
if(res){
//recuperar del cache
return res

}

// recuperar de la peticion la url
return fetch(e.request)

})

});