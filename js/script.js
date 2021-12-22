
// API NEWS
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
    url=`https://newsapi.org/v2/top-headlines?category=${cat}&language=en&pageSize=10&apiKey=233b6411d34640098f2872adb12f88d8`

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

}



// Api Weather
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
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

      // Using fetch to get data
      fetch(base)
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