const apiKey = "77d5a69265483b6a8db2ff5ab9d04ebb" ;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" ;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const city='NeW York City'

async function checkWeather(city){
    console.log(city)
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();



    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =Math.round(data.main.temp) + "°C" ;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".windspeed").innerHTML = data.wind.speed + "km/hr";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "./Images/clouds.png"
    }else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "./Images/clear-sky.png"
    }else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "./Images/rainy.png"
    } else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "./Images/drizzle.png"
    }else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "./Images/misty.png"
    }
    document.querySelector(".weather").style.display = "block";

}

searchBtn.addEventListener("click" , ()=>{
    checkWeather(searchBox.value);
});




// https://openweathermap.org/api/geocoding-api
// http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}


window.addEventListener("DOMContentLoaded", async () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let latUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${2}&appid=${apiKey}`;
    const response = await fetch(latUrl);
    var data = await response.json();
    checkWeather(data[0].name);
  });
});



checkWeather(city);