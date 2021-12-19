

const myFunction = (cat) => {
    url=`https://newsapi.org/v2/top-headlines?category=${cat}&apiKey=233b6411d34640098f2872adb12f88d8`

    fetch(url).then((res=>{
        res.json().then((res)=>{
     //mapping here




        })
    }))

}