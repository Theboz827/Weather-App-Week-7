//Feature #1
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
  let dayTime = document.querySelector("p#day-time-weather");
  dayTime.innerHTML = displayToday;
  return displayToday;
}
console.log(formatDate());

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
  displayDegree.innerHTML = `${temperature}°C`;
  let displayCity = document.querySelector("h1");
  displayCity.innerHTML = `${city}`;
  //grab precipitation and wind response data
  /*let displayPrec = document.querySelector("h2");
  displayPrec.innerHTML = `${response.data.weather[0].description}`;
  let displayWind = document.querySelector("h3");
  displayWind.innerHTML = `${response.data.wind}`;
  */
}
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
