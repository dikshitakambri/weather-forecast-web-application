const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    var City = (req.body.city);
    var apiKey = "9216e05e696f5cff415d1e822382ca06";
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
            res.write("<h1>Temperature of " + City +" is " + temp + " degree celcius</h1>");
            res.write("<p>Weather of " + City+" is " + weatherdescription + "</p>");
            res.write("<p>Pressure:" + pressure + "</>");
            res.write("<p>Humidity:" + humidity + "</>");
            res.write("<p>Wind speed is " + wind + "</>");
            res.write("<img src=" + imageURL +">");
            res.send();
        })
    });
});

    
app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});