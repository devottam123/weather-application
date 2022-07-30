const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config()

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+"#";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The weather is currently "+ weatherDescription + ".<p>");
      res.write("<h1>The temperature in"+ query +" is "+temp+" degrees Celsius.</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
      // const object = {
      //   name: "Devottam",
      //   job: "Full-stack Web Developer"
      // }
      // console.log(JSON.stringify(object));

    })
  })

})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running at port 3000.")
})
