//service worker

if("serviceWorker" in navigator){
    console.log("puedes usar el service worker en el navegador");
    navigator.serviceWorker.register("./sw.js")
    .then(res=> console.log("se ha cargado correctamente",res))
    .catch(err =>console.log("service worker no se ha podido registrar", err))


}else{
    console.log("No puede usar los service worker en tu navegador");
}

