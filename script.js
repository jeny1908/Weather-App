const apiKey = "54c90f2f22201ce33ed1a61408ba55dc";

const userlocation = document.getElementById("userlocation");
const converter = document.getElementById("converter");

const weathericon = document.querySelector(".weathericon");
const temperature = document.querySelector(".temperature");
const feelslike = document.querySelector(".feelslike");
const description = document.querySelector(".description");
const date = document.querySelector(".date");
const city = document.querySelector(".city");

const hvalue = document.getElementById("hvalue");
const wvalue = document.getElementById("wvalue");
const srvalue = document.getElementById("srvalue");
const ssvalue = document.getElementById("ssvalue");
const cvalue = document.getElementById("cvalue");
const uvvalue = document.getElementById("uvvalue");
const pvalue = document.getElementById("pvalue");

function finduserlocation() {
  const cityName = userlocation.value.trim();
  const units = converter.value;

  if (!cityName) {
    alert("Please enter a city name");
    return;
  }

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;

  fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }

      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

      weathericon.innerHTML = `<img src="${iconUrl}" alt="weather icon" width="100"/>`;
      temperature.textContent = `${data.main.temp}° ${units === "metric" ? "C" : "F"}`;
      feelslike.textContent = `Feels like: ${data.main.feels_like}°`;
      description.textContent = data.weather[0].description;
      city.textContent = data.name;
      date.textContent = new Date().toLocaleDateString();

      hvalue.textContent = `${data.main.humidity}%`;
      wvalue.textContent = `${data.wind.speed} ${units === "metric" ? "m/s" : "mph"}`;
      pvalue.textContent = `${data.main.pressure} hPa`;
      cvalue.textContent = `${data.clouds.all}%`;

      srvalue.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      ssvalue.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();

      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

      fetch(uvURL)
        .then(res => res.json())
        .then(uv => {
          uvvalue.textContent = uv.value;
        });
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to fetch weather data.");
    });
}
