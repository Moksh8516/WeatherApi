

const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".btn");
const weatherReportImg = document.querySelector(".weather-report");
async function checkweather(city) {
    const response = await fetch(`http://localhost:5000/api/weather?city=${city}`);
    // console.log(response)

    if (response.status == 404) {
        document.querySelector(".error p").style.display = "block";
        document.querySelector(".weather_details").style.display = "none";
    }
    else {

        let data = await response.json();

        document.querySelector(".city-name").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".description").innerHTML = data.weather[0].description;

        if (data.weather[0].main == "Clear") {
            weatherReportImg.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Clouds") {
            weatherReportImg.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherReportImg.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherReportImg.src = "images/mist.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherReportImg.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Snow") {
            weatherReportImg.src = "images/snow.png"
        }
        document.querySelector(".weather_details").style.display = "block";
        document.querySelector(".error p").style.display = "none";

        // console.log(data);
    }

}

searchBtn.addEventListener('click', () => {
    checkweather(searchBar.value);
})

checkweather();
