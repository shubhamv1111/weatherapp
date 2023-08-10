const apikey = "bfc9da78ce558b46c677770047f185ce";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

        const weatherMain = data.weather[0].main.toLowerCase();
        if (weatherMain === "clouds")
            weatherIcon.src = "images/clouds.png";
        else if (weatherMain === "clear")
            weatherIcon.src = "images/clear.png";
        else if (weatherMain === "rain")
            weatherIcon.src = "images/rain.png";
        else if (weatherMain === "drizzle")
            weatherIcon.src = "images/drizzle.png";
        else if (weatherMain === "mist")
            weatherIcon.src = "images/mist.png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Listen for Enter key press
searchBox.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        checkWeather(searchBox.value);
    }
});

// Listen for button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
