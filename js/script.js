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

/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const form = document.querySelector("#weather form");
const input = document.querySelector("#weather input");
const msg = document.querySelector("#weather .msg");
const city = document.querySelector("#weather .city");
/*PUT YOUR OWN KEY HERE - THIS MIGHT NOT WORK
SUBSCRIBE HERE: https://home.openweathermap.org/users/sign_up*/
const apiKey = "3ee75691029a24f2dc485291c42637ea";

form.addEventListener("submit", e => {
  e.preventDefault();
  const inputVal = input.value;
  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;
      const markup = `
      <div class="m-2 p-4 ">
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption class="mt-3">${weather[0]["description"]}</figcaption>
        </figure>
        </div>
      `;
      city.innerHTML = markup;
    })
    

  msg.textContent = "";
  form.reset();
  input.focus();
});