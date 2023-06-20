let now = new Date();
let dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = dayOfWeek[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let currentDateAndTime = document.querySelector("#current-date-time");
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDateAndTime.innerHTML = `${day} ${hours}:${minutes}`;

function displayCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city").value;
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=${unit}&appid=${apiKey}`;
  inputCity = "";

  function displayTemp(response) {
    console.log(response);
    document.querySelector("#city-name").innerHTML = response.data.name;
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    document.querySelector("#country").innerHTML = regionNames.of(
      response.data.sys.country
    );

    let temp = document.querySelector("#temperature");
    let roundedTemp = Math.round(response.data.main.temp);
    temp.innerHTML = `${roundedTemp}°C`;
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let humidityValue = response.data.main.humidity;
    let windValue = Math.round(response.data.wind.speed);
    humidity.innerHTML = `Humidity: ${humidityValue}%`;
    wind.innerHTML = `Wind: ${windValue}km/h`;
    document.querySelector("#description").innerHTML =
      response.data.weather[0].description;
  }
  axios.get(`${apiUrl}`).then(displayTemp);
}

let searchForm = document.querySelector("#searchcity-form");
searchForm.addEventListener("submit", displayCity);

function getCurrentLocation() {
  function getCurrentTemperature(response) {
    let currentTemperature = document.querySelector("#temperature");
    let roundedTemp = Math.round(response.data.main.temp);
    currentTemperature.innerHTML = `${roundedTemp}°C`;
    console.log(
      `Your current temperature where you are is ${currentTemperature.innerHTML}`
    );
    let currentLocation = document.querySelector("#city-name");
    let locationName = response.data.name;
    currentLocation.innerHTML = locationName;
    console.log(`Your current location is ${locationName}`);
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    document.querySelector("#country").innerHTML = regionNames.of(
      response.data.sys.country
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].description;
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let humidityValue = response.data.main.humidity;
    let windValue = Math.round(response.data.wind.speed);
    humidity.innerHTML = `Humidity: ${humidityValue}%`;
    wind.innerHTML = `Wind: ${windValue}km/h`;
  }

  function getCurrentCoordinates(position) {
    let latitude = position.coords.latitude.toFixed(2);
    let longitude = position.coords.longitude.toFixed(2);
    console.log(
      `Your current position is ${latitude}° latitude and ${longitude}° longitude`
    );
    let unit = "metric";
    let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

    axios.get(`${apiUrl}`).then(getCurrentTemperature);
  }
  navigator.geolocation.getCurrentPosition(getCurrentCoordinates);
}
let currentLocationTemperature = document.querySelector("#current-weather");
currentLocationTemperature.addEventListener("click", getCurrentLocation);
