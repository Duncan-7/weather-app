async function getWeather(location) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=c8d578d915427955af496a6973fe82c5`);
  const weatherData = await response.json();
  return weatherData;
}

const weatherFactory = function (weatherData) {
  return ({
    "weather": weatherData.weather[0].main,
    "description": weatherData.weather[0].description,
    "temperature": weatherData.main.temp,
    "location": `${weatherData.name}, ${weatherData.sys.country}`,
    "iconcode": weatherData.weather[0].icon
  })
}

async function buildPage(location) {
  weather = await getWeather(location)
  weatherObject = weatherFactory(weather)
  createContent(weatherObject);
  console.log(weatherObject);
}

function createContent(weatherObject) {
  const location = document.getElementById('heading');
  location.textContent = weatherObject.location;

  const description = document.getElementById('description');
  description.textContent = weatherObject.weather;

  weatherIcon(weatherObject);

  let celsius = Math.round(weatherObject.temperature - 273.15);
  const temperature = document.getElementById('degrees');
  temperature.textContent = celsius;
  document.getElementById('scale').textContent = "°C"
}

function weatherIcon(weatherObject) {
  const icon = document.getElementById('icon');
  icon.src = `http://openweathermap.org/img/w/${weatherObject.iconcode}.png`
}

function toggleTemperature(weatherObject) {
  const kelvin = weatherObject.temperature;
  const celsius = Math.round(kelvin - 273.15);
  const fahrenheit = Math.round(celsius * (9 / 5) + 32);
  const currentScale = document.getElementById('scale').textContent

  if (currentScale == "°C") {
    document.getElementById('degrees').textContent = fahrenheit;
    document.getElementById('scale').textContent = "°F"
  } else if (currentScale == "°F") {
    document.getElementById('degrees').textContent = celsius;
    document.getElementById('scale').textContent = "°C"
  }
}

buildPage("London")

