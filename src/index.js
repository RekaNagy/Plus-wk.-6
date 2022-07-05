//1st - wk. 4
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `Last updated, ${day},${hours}:${minutes}`;
}

let dateUpdate = document.querySelector("#date-update");
let currentTime = new Date();
dateUpdate.innerHTML = formatDate(currentTime);

//2nd - wk. 4
function search(event) {
  event.preventDefault();
  let mainCity = document.querySelector("#main-city");
  let locationInput = document.querySelector("#location-input");
  mainCity.innerHTML = locationInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// wk. 5

function showWeather(response) {
  let temperatureElement = document.querySelector("#main-temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;
  let mainCity = document.querySelector("#main-city");
  mainCity.innerHTML = response.data.name;
  let mainDescription = document.querySelector("#main-description");
  mainDescription.innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "1eac74aa79f3f51b004e75e3c93550b5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function searchInput(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  let apiKey = "1eac74aa79f3f51b004e75e3c93550b5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let searchLocation = document.querySelector("#search-button");
searchLocation.addEventListener("click", searchInput);

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
let currentLocButton = document.querySelector("#current-location-button");
currentLocButton.addEventListener("click", getCurrent);
