const AllCategories = document.querySelectorAll(".Category-Title");

const fetchCat =(event)=>{
let cat = event.target.getAttribute("data-value")
console.log(cat);
NewsFunction(cat);
}
for(let i=0;i<AllCategories.length;i++){
    AllCategories[i].addEventListener("click",fetchCat);

}


const NewsFunction = (cat) => {
    url=`https://newsapi.org/v2/top-headlines?category=${cat}&apiKey=233b6411d34640098f2872adb12f88d8`

    fetch(url).then((res=>{
        res.json().then((res)=>{
            console.log(res.articles)
     //mapping here
      
document.getElementById('newsCard').innerHTML = res.articles.map(item =>
`<div class="card">
      
      <div class="col-12"><img class="w-100 h-100 "src="${item.urlToImage}" alt=""></img>
      </div>
      <div class="col-12">
          <a href=${item.url}><h4>${item.title}</h4></a>
          <p>${item.description}</p>
      </div>
      <div class="col-12">
           <p>${item.publishedAt} </p>
      </div>
          </div>`).join('')

        })
    }))

}
