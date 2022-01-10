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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

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

//get coordinates
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a112a1581159b740378440ea43ef872d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
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
  celsiusTemp = response.data.main.temp;
  displayDegree.innerHTML = `${temperature}°`;
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
  //console.log(response.data);
  getForecast(response.data.coord);
}

//Locate current position
/*
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
*/
//Convert Celsius to Fahrenheit
function celsiusToFahrenheit(event) {
  event.preventDefault();
  let convertTemp = document.querySelector("#degrees");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  convertTemp.innerHTML = Math.round(fahrenheitTemp);
}
//Convert Fahrenheit to Celsius
function fahrenheitToCelsius(event) {
  event.preventDefault();
  let convertTemp = document.querySelector("#degrees");
  convertTemp.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let convertCelciusToFahrenheit = document.querySelector("#fahrenheit");
convertCelciusToFahrenheit.addEventListener("click", celsiusToFahrenheit);

let convertFahrenheitToCelsius = document.querySelector("#celsius");
convertFahrenheitToCelsius.addEventListener("click", fahrenheitToCelsius);
/*
function fahrenheitToCelsius(event) {
  event.preventDefault();
  let convertToCelsius = document.querySelector("#degrees");
  convertToCelsius.innerHTML = "40°";
}
*/

//forecast section
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast-section");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="days">${formatDay(forecastDay.dt)}</div>
                <span class="emoji">
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    width="40"
                    height="40"
                    id="icon"
                  />
                </span>
                <div class="daily-temps">
                  <span class="daily-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}&deg;</span>
                  <span class="daily-temperature-min">&nbsp;${Math.round(
                    forecastDay.temp.min
                  )}&deg;</span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
