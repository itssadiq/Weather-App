import { fetchWeatherData } from "./fetch.js";

const data = await fetchWeatherData("karachi");

generateCurrentWeatherSection(data);
generateDailyForecastSection(data);

const inputEl = document.querySelector(".search-input");
const searchEl = document.querySelector(".fa-search");

inputEl.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    let inputValue = inputEl.value;

    const data = await fetchWeatherData(inputValue);

    await generateCurrentWeatherSection(data);
    await generateDailyForecastSection(data);
    inputEl.value = "";
  }
});

searchEl.addEventListener("click", async () => {
  let inputValue = inputEl.value;

  const data = await fetchWeatherData(inputValue);

  await generateCurrentWeatherSection(data);
  await generateDailyForecastSection(data);
  inputEl.value = "";
});

async function generateCurrentWeatherSection(data) {
  const city = data.location.name;
  const country = data.location.country;
  const temp = Math.round(data.current.temp_c);
  const description = data.current.condition.text;
  const icon = data.current.condition.icon;
  const humidity = data.current.humidity;
  const wind = Math.round(data.current.wind_kph);
  const feelsLikeCels = Math.round(data.current.feelslike_c);
  const uv = Math.round(data.current.uv);
  const timeZone = data.location.tz_id;
  const cityDateTime = new Intl.DateTimeFormat("en-US", {
    timeZone,
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());

  const formattedDateTime = cityDateTime.replace(/, \d{4} at /, ", ");

  const section = document.querySelector(".current-weather");

  section.innerHTML = `
    <div class="location-container">
            <h2 class="location">${city}, ${country}</h2>
            <p class="date-time">${formattedDateTime}</p>
          </div>

          <div class="weather-main">
            <div class="weather-icon">
              <!-- <i class="fas fa-cloud-sun"></i> -->
              <img src="${icon}" alt="" />
            </div>
            <div class="temperature">${temp}<span>°</span></div>
            <p class="weather-description">${description}</p>
          </div>

          <div class="weather-details">
            <div class="detail-item">
              <p class="detail-label">Humidity</p>
              <p class="detail-value humidity-value">${humidity}%</p>
            </div>
            <div class="detail-item">
              <p class="detail-label">Wind</p>
              <p class="detail-value wind">${wind} km/h</p>
            </div>
            <div class="detail-item">
              <p class="detail-label">Feels Like</p>
              <p class="detail-value feels-like">${feelsLikeCels}°</p>
            </div>
            <div class="detail-item">
              <p class="detail-label">UV Index</p>
              <p class="detail-value uv-rays">${uv} of 10</p>
            </div>
          </div>
  `;
}

async function generateDailyForecastSection(forecastData) {
  const foreCastEl = document.querySelector(".forecast-cards");
  const foreCast = forecastData.forecast.forecastday.slice(1);

  let foreCastHTML = "";

  foreCast.forEach((element) => {
    const elementDate = element.date;
    const inputDate = elementDate;
    const icon = element.day.condition.icon;
    const maxTemp = Math.round(element.day.maxtemp_c);
    const minTemp = Math.round(element.day.mintemp_c);
    const date = new Date(elementDate);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const monthDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    let html = `
      <div class="forecast-card">
        <div class="forecast-day">${dayName}</div>
        <div class="forecast-date">${monthDate}</div>
        <div class="forecast-icon">
          <!-- <i class="fas fa-sun"></i> -->
          <img src="${icon}" alt="" />
        </div>
        <div class="forecast-temp">
          <span class="forecast-high">${maxTemp}°</span>
          <span class="forecast-low">${minTemp}°</span>
        </div>
      </div>
    `;
    foreCastHTML += html;
  });

  foreCastEl.innerHTML = foreCastHTML;
}
