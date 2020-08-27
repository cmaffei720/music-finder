// // Imports
// var express = require('express');
// var router = express.Router();
// var request = require('request');

// var db = require('../models');

// // GET route which calls uses Sequelize's findAll method.
// // router.get('/', function(req, res) {
// //     db.Artist.findAll({
// //         order: 'artist_name ASC'

// //     }).then(function(data) {
// //         var hbsObject = {
// //             artists: data
// //         };
// //         res.render('artist', hbsObject);
// //     });
// // });

// // router.get('/song', function(req, res) {
// //     db.Song.findAll({
// //         order: 'song_name DESC'

// //     }).then(function(data) {
// //         var hbsObject = {
// //             songs: data
// //         };
// //         res.render('songs', hbsObject);
// //     });
// // });

// // router.get('/album', function(req, res) {
// //     db.Album.findAll({
// //         order: 'album_name DESC'

// //     }).then(function(data) {
// //         var hbsObject = {
// //             albums: data
// //         };
// //         res.render('album', hbsObject);
// //     });
// // });


// router.post('/api/new/artist', function(req, res) {

//     var artistName = req.body.name;

//     var queryUrl = "https://deezerdevs-deezer.p.rapidapi.com/search&q=" + artistName;

//     request(queryUrl, function(error, response, body) {


//         if (!error && JSON.parse(body).Response !== 'False') {
//             console.log(JSON.parse(body));

//             var name = JSON.parse(body).artist.name;

//             console.log(name);

//             var artist = "";

//             var options = {
//                 method: 'GET',
//                 url: 'https://deezerdevs-deezer.p.rapidapi.com/search' + name,
//                 qs: {
//                     language: 'en-US',
//                     api_key: '778af56556msh60df0212f929a25p1bd6fajsn95b39208364f'
//                 },
//                 body: '{}'
//             };

//             request(options, function(error, response, result) {

//                 if (error) res.redirect('/');
//                 if (!JSON.parse(result).results) {
    
//                     res.redirect('/')
//                 } else {
//                     artist = JSON.parse(result).results[0].key;
//                     console.log(artist);
//                     db.Artist.create({
//                         artist_name: JSON.parse(body).artist.name,
//                     }).then(function() {
//                         res.redirect('/');
//                     });

//                 }
//             });

//         } else {
//             console.log("\nOops...something went wrong with you musical search. Try again...");
//             res.redirect('/');
//         }
//     });
// });

// /////////////////////////////////////////////////////////////////////
// router.put('/api/new/artist/:id', function(req, res) {

//     var added = true;
//     var ID = req.params.id;

//     db.Artist.update({
//         added: added,

//     }, { where: { id: ID } }).then(function() {
//         res.redirect('/');
//     });
// });


// module.exports = router;

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