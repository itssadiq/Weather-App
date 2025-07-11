const inputEl = document.querySelector(".search-input");
const searchEl = document.querySelector(".fa-search");
let locationHeadingEl = document.querySelector(".location");
let temperatureEl = document.querySelector(".temperature");
let descriptionEl = document.querySelector(".weather-description");
let weatherIconEl = document.querySelector(".weather-icon img");
let humidityEl = document.querySelector(".humidity-value");

inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    let inputValue = inputEl.value;
    fetchData(inputValue);
  }
});

searchEl.addEventListener("click", () => {
  let inputValue = inputEl.value;

  fetchData(inputValue);
});

// let Data = "";

function fetchData(cityName) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=b7063c358ff24027a5e155012251107&q=${cityName}&aqi=no`
  )
    .then((raw) => raw.json())
    .then((data) => {
      const city = data.location.name;
      const country = data.location.country;
      locationHeadingEl.innerHTML = `${city}, ${country}`;

      const temp = data.current.temp_c;
      temperatureEl.innerHTML = `${temp}<span>°</span>`;

      const description = data.current.condition.text;
      descriptionEl.innerHTML = description;

      const icon = data.current.condition.icon;
      weatherIconEl.src = icon;

      const humidity = data.current.humidity;
      humidityEl.innerHTML = `${humidity}%`;

      console.log(data);
    });
}
