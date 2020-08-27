// Requiring our models
var db = require("../models");
const axios = require("axios");

module.exports = function(app) {

  // Route for logging user out
  app.get("/api/artist/:name", function(req, res) {
    console.log(req.params.name)
    axios({
        "method":"GET",
        "url":"https://deezerdevs-deezer.p.rapidapi.com/search",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key":"778af56556msh60df0212f929a25p1bd6fajsn95b39208364f",
        "useQueryString":true
        },"params":{
        "q": req.params.name
        }
        })
        .then((response)=>{
          console.log(response.data)
          res.json(response.data)
        })
        .catch((error)=>{
          console.log(error)
        })
  });
}