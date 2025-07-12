export async function fetchWeatherData(cityName) {
  let API = `http://api.weatherapi.com/v1/forecast.json?key=b7063c358ff24027a5e155012251107&q=${cityName}&days=8&aqi=no&alerts=no
  `;

  const res = await fetch(API);

  const data = await res.json();

  return data;
}
