var express = require ("express");
// Requiring our models
var db = require("../models");
var router = require("express").Router();
// Routes
// =============================================================
module.exports = function(app) {
// const song = require(“../controllers/musicController.js”);
  // GET route for getting all of the todos
  app.get("/api/song", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Artist.findAll({
      order: 'artist_name ASC'
  }).then(function(data) {
      var hbsObject = {
          artists: data
      };
      res.render('song', hbsObject);
  });
      // We have access to the todos as an argument inside of the callback function
  });


  db.Song.findAll({
    order: 'artist_name ASC'
}).then(function(data) {
    var hbsObject = {
        song: data
    };
    res.render('song', hbsObject);
});

}
