import { fetchWeatherData } from "./fetch.js";

const inputEl = document.querySelector(".search-input");
const searchEl = document.querySelector(".fa-search");
const locationHeadingEl = document.querySelector(".location");
const temperatureEl = document.querySelector(".temperature");
const descriptionEl = document.querySelector(".weather-description");
const weatherIconEl = document.querySelector(".weather-icon img");
const humidityEl = document.querySelector(".humidity-value");
const windEl = document.querySelector(".wind");
const feelsLikeEl = document.querySelector(".feels-like");
const uvRays = document.querySelector(".uv-rays");
const dateTime = document.querySelector(".date-time");

inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    let inputValue = inputEl.value;

    updateWeather(inputValue);
  }
});

searchEl.addEventListener("click", () => {
  let inputValue = inputEl.value;

  updateWeather(inputValue);
});

async function updateWeather(cityName) {
  const data = await fetchWeatherData(cityName);

  const city = data.location.name;
  const country = data.location.country;
  const temp = data.current.temp_c;
  const description = data.current.condition.text;
  const icon = data.current.condition.icon;
  const humidity = data.current.humidity;
  const wind = data.current.wind_kph;
  const feelsLikeCels = data.current.feelslike_c;
  const uv = data.current.uv;
  const timeZone = data.location.tz_id;
  const cityDateTime = new Intl.DateTimeFormat("en-US", {
    timeZone,
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());
  const firstHalf = cityDateTime.slice(0, 17);
  const secondHalf = cityDateTime.slice(27);
  const currentDateTime = `${firstHalf} • ${secondHalf}`;

  locationHeadingEl.innerHTML = `${city}, ${country}`;
  temperatureEl.innerHTML = `${temp}<span>°</span>`;
  descriptionEl.innerHTML = description;
  weatherIconEl.src = icon;
  humidityEl.innerHTML = `${humidity}%`;
  windEl.innerHTML = `${wind} km/h`;
  feelsLikeEl.innerHTML = `${feelsLikeCels}°`;
  uvRays.innerHTML = `${uv} of 10`;
  dateTime.innerHTML = currentDateTime;
}
