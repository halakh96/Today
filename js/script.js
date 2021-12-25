

// API WEATHER / CURRENT LOCATION
const api = '3ee75691029a24f2dc485291c42637ea'; 

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const desc = document.querySelector('.desc');


window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

      // Using fetch to get data
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp  } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;          

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${Math.floor(temp)}°`;

          
         
        });
    });
  }
});


// API WEATHER BY SEARCH
 const weatherForm = document.querySelector(".citySearch form");

weatherForm.addEventListener("submit", (event)=>{
  event.preventDefault()

  let City = document.querySelector(".citySearch input").value;
 url =`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${api}&units=metric`;

 fetch(url)
 .then((response) => {
   return response.json();
 })
 .then((data) => {
   const  temp  = data.main;
   const place = data.name;
   const { description, icon } = data.weather[0];

   const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;          

   // Interacting with DOM to show data
   iconImg.src = iconUrl;
   loc.textContent = `${place}`;
   desc.textContent = `${description}`;
   tempC.textContent = `${Math.floor(temp)}°`;

   
  
 });
});




// API NEWS BY CATEGORIES
const AllCategories = document.querySelectorAll(".Category-Title");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
var page = '1';

const fetchCat =(event)=>{
    let cat = event.target.getAttribute("data-value")
    console.log(cat);
    NewsFunction(cat);
    }
for(let i=0;i<AllCategories.length;i++){
    AllCategories[i].addEventListener("click",fetchCat);

}

const NewsFunction = (cat) => {
    url=`https://newsapi.org/v2/top-headlines?category=${cat}&language=en&pageSize=2&page=${page}&apiKey=233b6411d34640098f2872adb12f88d8`

    fetch(url)
    .then((res=>{res.json()
        .then((res)=>{ 
            console.log(res.articles)
    
            //mapping here
      
document.getElementById('newsCard').innerHTML = res.articles.map(item =>
`<div class="card p-3 mt-3">
<div class="row ">
<div class="col-12 col-md-4 "><img class="w-100 h-100 "src="${item.urlToImage}" alt=""></img>
</div>
<div class="col-12 col-md-8 mt-2">
    <h4>${item.title}</h4>
    <p>${item.description}</p>
    <a href="${item.url}">Read More</a>
    <p class="float-end">${item.publishedAt} </p>
</div>
    </div>
    </div>
    `
          ).join('')

        })
    }))
    nextBtn.addEventListener("click", ()=>{
      console.log("next");
      page++;
      NewsFunction(cat);
      })

      prevBtn.addEventListener("click", ()=>{
        page--;
        NewsFunction();
        })
        
    
}





// API NEWS BY SEARCH 
const newsForm = document.querySelector(".newsSearch form");
newsForm.addEventListener("submit", (event)=>{

  event.preventDefault()
  let newsInput = document.querySelector("#newsSearch").value;

console.log(newsInput,"string News");
    url=`https://newsapi.org/v2/everything?q=${newsInput}&language=en&pageSize=10&apiKey=233b6411d34640098f2872adb12f88d8`

    fetch(url)
    .then((res=>{res.json()
        .then((res)=>{ 
            console.log(res.articles)
    
            //mapping here
      
document.getElementById('newsCard').innerHTML = res.articles.map(item =>
`<div class="card p-3 mt-3">
<div class="row ">
<div class="col-12 col-md-4 "><img class="w-100 "src="${item.urlToImage}" alt=""></img>
</div>
<div class="col-12 col-md-8 mt-2">
    <h4>${item.title}</h4>
    <p>${item.description}</p>
    <a href="${item.url}">Read More</a>
    <p class="float-end">${item.publishedAt} </p>
</div>
    </div>
    </div>
    `
          ).join('')

        })
    }))

}

);

NewsFunction("general");