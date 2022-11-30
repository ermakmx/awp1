//service worker

// if("serviceWorker" in navigator){
//     console.log("puedes usar el service worker en el navegador");
//     navigator.serviceWorker.register("./sw.js")
//     .then(res=> console.log("se ha cargado correctamente",res))
//     .catch(err =>console.log("service worker no se ha podido registrar", err))


// }else{
//     console.log("No puede usar los service worker en tu navegador");
// }

const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        if (registration.installing) {
          console.log("Service worker instalando");
        } else if (registration.waiting) {
          console.log("Service worker instalado");
        } else if (registration.active) {
          console.log("Service worker activo");
        }
      } catch (error) {
        console.error(`Fallo al registrar service worker     ${error}`);
      }
    }
  };
  
  // …
  
  registerServiceWorker();
  