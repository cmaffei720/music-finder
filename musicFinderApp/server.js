var express = require("express");
// Set Handlebars.
var exphbs = require("express-handlebars");
// var router = require("express").Router();
var PORT = process.env.PORT || 8085;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));


// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var db = require("./models")

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var router = express.Router();

// Import routes and give the server access to them.
var routes = require("./controllers/musicController.js");

app.use(routes);


//GET method route
app.get('/', function (req, res) {
  res.render('frontpage')
})

router.get('/artist', function(req, res) {
  db.Artist.findAll({
      order: 'artist_name ASC'

  }).then(function(data) {
      var hbsObject = {
          artists: data
      };
      res.render('artist', hbsObject);
  });
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

