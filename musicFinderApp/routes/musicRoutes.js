// Requiring our models
var db = require("../models");
  
var router = require("express").Router();
var db = require ("../models")
var song = require("../models/song.js")
var artist = require ("../models/artist.js")
var album = require("../models/album.js")
var playlist = require("../models/playlist.js")

// Routes
// =============================================================
module.exports = function(app) {

  router.get('/', function(req, res) {
    console.log(req)
  .then(function(data) {
    res.render('frontpage', data);
  })
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

router.get('/song', function(req, res) {
    db.Song.findAll({
        order: 'song_name DESC'

    }).then(function(data) {
        var hbsObject = {
            songs: data
        };
        res.render('songs', hbsObject);
    });
});

router.get('/album', function(req, res) {
    db.Album.findAll({
        order: 'album_name DESC'

    }).then(function(data) {
        var hbsObject = {
            albums: data
        };
        res.render('album', hbsObject);
    });
});







  // GET route for getting all of the todos
  app.get("/api/songs", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Song.findAll({}).then(function(dbSong) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbSong);
    });
  });

  // POST route for saving a new todo
  app.post("/api/songs/:name", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Song.create({
      name: req.params.name,
      added: req.body.added
    }).then(function(dbSongPlaylist) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbSongPlaylist);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  app.post("/api/artists/:name", function(req, res) {
    db.Artist.create({
      name: req.params.name,
      added: req.body.added
    }).then(function(dbArtist) {
      res.json(dbArtist);
    })
      .catch(function(err) {
        res.json(err);
      });
  });
  
  app.post("/api/albums/:name", function(req, res) {
    db.Album.create({
      name: req.params.name,
      added: req.body.added
    }).then(function(dbAlbum) {
      res.json(dbAlbum);
    })
      .catch(function(err) {
        res.json(err);
      });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/songs/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Song.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSongPlaylist) {
      res.json(dbSongPlaylist);
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/songs", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Song.update({
      name: req.body.name,
      added: req.body.added
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbSongPlaylist) {
      res.json(dbSongPlaylist);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
};

module.exports = router;