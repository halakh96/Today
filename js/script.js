const AllCategories = document.querySelectorAll(".Category-Title");

//  news api
const fetchCat =(event)=>{
let cat = event.target.getAttribute("data-value")
console.log(cat);
NewsFunction(cat);
}
for(let i=0;i<AllCategories.length;i++){
    AllCategories[i].addEventListener("click",fetchCat);

}

const NewsFunction = (cat) => {
    url=`https://newsapi.org/v2/top-headlines?category=${cat}&language=en&apiKey=233b6411d34640098f2872adb12f88d8`

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



// weather api


const weatherFetch =(city)=>{
url=`https://api.weatherbit.io/v2.0/current?city=${city}&KEY=72b065a0dd03481089c7c4cffaf9e566`
fetch(url).then((res=>{
    res.json().then((res)=>{
        console.log(res.data)
 //mapping here
  
document.getElementById('weather').innerHTML = res.data.map(item =>
`<div class="container-fluid p-5 ">
    <div class="d-flex justify-content-evenly ">
<div class="fw-bold fs-2 fst-italic ">${item.city_name}</div>
<div> ${item.weather.icon}</div>
</div>

<div class=" text-center m-3">
<h1>${item.temp}&deg</h1>
</div>
<div class="text-center m-3">${item.weather.description}</div>
<div class="d-flex justify-content-evenly ">
<div>Humidity:${item.rh}%</div>
<div>Wind Speed: ${item.wind_spd}km/h</div>
</div>
</div>`
    ).join('')
    })
}))


}


const city = document.querySelector("#cityText");
const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click",weatherFetch(city));

