
const ak = 'c721a255bcbb4ec9a4b47a29157435af';
const issue = 'security';
const numeroNoticias = 9;

let initNews = document.getElementById('noticiasContainer');
let conjuntoNews = '';
fetch(`https://newsapi.org/v2/everything?q=${issue}&language=es&pageSize=${numeroNoticias}&apiKey=${ak}`,{
  credentials: 'include'
})
.then(response => response.json()).then((data)=>{
    data.articles.forEach(element => {
       // console.log(element);
          
        initNews.innerHTML = initNews.innerHTML +  `<div class="col">
        <div class="card"><a href="${element.url}">
        <img src="${element.urlToImage}"  class="card-img-top" alt="image"></a>
        <div class="card-body">
          <h5 class="card-title"><a href="${element.url}">${element.title}</a></h5>
          <p class="card-text">${element.description}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">${element.publishedAt}</small>
        </div>
      </div>
      </div>
      `
    
    });
    
}).catch(e => {
    console.log(e);
})

var url = window.location.href;
var swlocation = 'sw.js'; 
// Añadir el SW
if ( navigator.serviceWorker ) {

    if ( url.includes('localhost') ) {
        swlocation = '/sw.js';
    }

    
    navigator.serviceWorker.register(swlocation);
}
