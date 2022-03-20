const API_KEY='a33abd27879c15de5af7cc46383844a0'
const onGeoOk=(position)=>{
    const lat =position.coords.latitude
    const lng=position.coords.longitude
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    fetch(url).then((response)=>response.json())
    .then((data)=>{
        const city=document.querySelector('#weather-form div:first-child')
        const weather=document.querySelector('#weather-form div:last-child')
        city.innerText=`현재 위치 : ${data.name}`
        weather.innerText=`날씨상태/현재온도 : ${data.weather[0].main} / ${data.main.temp}`
    })
}
const onGeoError=()=>{
    console.log("Error")
}
navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError)