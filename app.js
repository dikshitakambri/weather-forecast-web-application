const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const dotenv = require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", 'ejs');

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    var City = (req.body.city);
    var apiKey = process.env.MY_API_TOKEN;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + City +"&appid=" + apiKey +"&units=metric";
    https.get(url, function(response ) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherdescription = weatherData.weather[0].description
            const pressure = weatherData.main.pressure
            const humidity = weatherData.main.humidity
            const wind = weatherData.wind.speed
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.render("weather",{
                City: City,
                temp: temp,
                weatherdescription: weatherdescription,
                pressure: pressure,
                humidity: humidity,
                wind: wind,
                icon:icon,
                imageURL : imageURL
            });
        })
    });
});

app.listen(3000, function(){
    console.log("Server running on 3000 port");
});