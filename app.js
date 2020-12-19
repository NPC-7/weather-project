const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function (req, res) {
  res.sendFile(__dirname +"/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body.cityName);

  const apiKeyId = "3b9a2d5e5dc71b5c09ac57787a0cfe6d";
  const query = req.body.cityName;
  const units = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKeyId+"&units="+units+"";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      //ini parsing data ke bentuk JSON
      const weatherData = JSON.parse(data);

      //console.log(weatherData);

      /*
      const object = {
        name : "NPC",
        food : "Kebab"
      }

      console.log(JSON.stringify(object));
      */

      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      console.log(weatherDesc);
      res.write("<p>It's actually " + weatherDesc + " here.</p>");
      res.write("<h1>The temperature in "+ weatherData.name + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src='http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png' alt='" + weatherDesc + "'>")
      res.send();
    })
  });

  //res.send("server is up and running");
});


app.listen(3000, function () {
  console.log("the server is running on port 3000");
})
