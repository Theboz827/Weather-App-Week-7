function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
/* old function
let today = new Date();
function formatDate() {
  let hours = today.getHours();
  let minutes = today.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDays = days[today.getDay()];
  let displayToday = `${weekDays} ${hours}:${minutes}`;
  let dayTime = document.querySelector("li#day-time-weather");
  dayTime.innerHTML = displayToday;
  return displayToday;
}
console.log(formatDate());
*/

//Feature #2
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please enter a city.");
  }
  // add city value here
  let city = document.querySelector("#search-text-input").value;
  console.log(city);
  let unit = "metric";
  let apiKey = "a112a1581159b740378440ea43ef872d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentTemp);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//get current temperature
function showCurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let displayDegree = document.querySelector("#degrees");
  let displayCity = document.querySelector("h1");
  let displayWeatherDesc = document.querySelector("#weather-desc");
  let displayHumidity = document.querySelector("#humidity");
  let displayWind = document.querySelector("#wind");
  let dateElement = document.querySelector("li#day-time-weather");
  let iconElement = document.querySelector("#icon");
  displayDegree.innerHTML = `${temperature}°C`;
  displayCity.innerHTML = `${city}`;
  displayWeatherDesc.innerHTML = `${response.data.weather[0].description}`;
  displayHumidity.innerHTML = `${response.data.main.humidity}`;
  displayWind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  //display weekday and time of location
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  //Precipitation not set up with correct field yet. Add later
  //let displayPrecipitation = document.querySelector("#precipitation");
  //displayPrecipitation.innerHTML = `${response.data.clouds.all}`;
}

//Locate current position

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let unit = "metric";
  let apiKey = "a112a1581159b740378440ea43ef872d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentTemp);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

//Convert C to F
/* function cToF(event) {
  event.preventDefault();
  let convertToF = document.querySelector("#degrees");
  convertToF.innerHTML = "19°";
}
let degreesSwitch = document.querySelector("#celsius");
degreesSwitch.addEventListener("click", cToF);

function fToC(event) {
  event.preventDefault();
  let convertToC = document.querySelector("#degrees");
  convertToC.innerHTML = "40°";
}
let degreesSwitchTwo = document.querySelector("#fahrenheit");
degreesSwitchTwo.addEventListener("click", fToC);
*/
