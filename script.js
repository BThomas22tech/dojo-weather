// const toggleButton = document.querySelector("#toggle-button");
// toggleButton.addEventListener("click", converttemp);
console.log("im connected")
function hide(element) {
    element = document.querySelector("#cookie-holder");
    element.remove();
}

// "lat":36.1622767,"lon":-86.7742984,"
// "https://api.openweathermap.org/data/2.5/forecast?lat=36.1622767&lon=-86.7742984&appid=0f6ddb4f4ad9e55fb15c16fe116e0087"

async function getweather(units) {
    var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Nashville, US&appid=0f6ddb4f4ad9e55fb15c16fe116e0087&units=${units}`);
    var weatherData = await response.json();

    console.log(weatherData);
    const weather_pic = weatherData.weather[0].main;
    const current_temp = weatherData.main.temp;
    const low_temp = weatherData.main.temp_min;
    const high_temp = weatherData.main.temp_max;
    const weather_high = document.getElementById('high_one');
    const weather_low = document.getElementById('low_one');
    weather_low.innerText = Math.trunc(low_temp);
    weather_high.innerText = Math.trunc(high_temp);
    console.log(weather_pic);
    
    return [weather_pic,low_temp,high_temp];
}

async function show_weather() {
    var weather_pic_element = document.getElementById("img_element");
    var forecast_description = document.getElementById("forecast")
    const currentDate = new Date();
    const dateElement = document.getElementById("date");
    const units = document.getElementById("temperature").value;
    const [weather_pic,low_temp, high_temp] = await getweather(units);
    dateElement.innerText = currentDate.toDateString();
    
    if (weather_pic === "Clear" || weather_pic === "Sunny") {
        weather_pic_element.src = "assets/some_sun.png";
        forecast_description.innerText = "Some Sun"
        
    } else {
        weather_pic_element.src = "assets/some_clouds.png";
        forecast_description.innerText = "Some Clouds";
    }
    if (weather_pic === "Rain"){
        weather_pic_element.src = "assets/some_rain.png"
        forecast_description.innerText = "Some Rain"
    }
}

show_weather();

async function converttemp(){
    
    var units = document.getElementById("temperature").value
    if (units === "imperial"){
        units = "metric"
    }
    else{
        units = "imperial"
    }
    await show_weather(units)
}
document.getElementById("temperature").addEventListener("change", converttemp);