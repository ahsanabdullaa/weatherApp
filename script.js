// Replace 'YOUR_API_KEY' with your actual WeatherAPI.com API key
const apiKey = "52f890bc00dd41a28ab162400231809";

// Function to fetch weather data from WeatherAPI.com
async function getWeatherData(city) {
  try {
    document.getElementById("error").style.color = "transparent";
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=9`
    );
    if (response.status === 400) {
      document.getElementById(
        "weather-info"
      ).innerHTML = `  <h2 class="city">City not found</h2>`;
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log(data);
    const forecastInfo = data.forecast.forecastday
      .slice(1)
      .map((item) => {
        return `
            <div class="day">
                <h3>${item.date}</h3>
                <p>Max Temp: ${item.day.maxtemp_c}°C</p>
                <p>Min Temp: ${item.day.mintemp_c}°C</p>
                <img src="${item.day.condition.icon}" alt="Weather Icon">
                <p>Condition: ${item.day.condition.text}</p>
            </div>
            `;
      })
      .join("");

    // Display weather information
    const weatherInfo = `
            <h2 class="city">${data.location.name}, ${data.location.region}</h2>
            <h2 class="region">${data.location.country}</h2>
            <p>Temperature: ${data.current.temp_c}°C </p>
            <img id="weatherIcon" src="${data.current.condition.icon}" alt="Weather Icon">

            <p>Condition: ${data.current.condition.text}</p>
            <div class="forecast">${forecastInfo}</div>
        `;

    document.getElementById("weather-info").innerHTML = weatherInfo;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("error").style.color = "rgb(232, 45, 45)";
  }
}

// Get a reference to the search button and input field
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");

// Add a click event listener to the search button
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const cityName = cityInput.value.trim(); // Get the city name from the input field
  if (cityName !== "") {
    getWeatherData(cityName);
  } else {
    alert("Please enter a city name.");
  }
});
