const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({encoded: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apikey = "bfbd0f87c2e76a364032f4f9ac8ab13b";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units="+unit;
    https.get(url, function (response) {
        console.log(response.statusCode);

    response.on("data", function (data) {
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const weatherDesc = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The weather is currently " + weatherDesc + "</p>");
        res.write("<h1>The temperatur in "+query+" is: " + temp + " degree Celcius.</h1>");
        res.write("<img src= " + imageURL + ">");
        res.send();
    })
})

});



app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});

