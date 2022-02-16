const express = require("express");
const res = require("express/lib/response");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const cityName = req.body.cityName;
    console.log(cityName);
    const apiKey = "7782134a7eaf9755321bb1e2e2552df9"
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + cityName + "&units=metric";
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            var imageURL = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png';
            imageWeather = '<img class="icon" src="images/4571485.png" alt="">';
            res.render(__dirname + "/result.html", { description: weatherData.weather[0].description, city: weatherData.name, temperature: weatherData.main.temp, feelslike: weatherData.main.feels_like, image: imageWeather });
            // res.write("<h1>It is " + weatherData.weather[0].description + " in " + cityName + "</h1>");
            // res.write("<h2>The temperature is " + weatherData.main.temp + " and feels like " + weatherData.main.feels_like + "</h2>");
            // res.write("<img src = 'http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png'></img>");
            // res.send();
        });
    });
});



app.listen(1808, function() {
    console.log("Server is running on port 1808");
});