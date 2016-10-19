var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg')
var path = require('path');

// module with bcrypt functions
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pool = new pg.Pool(connection);

// Handles POST request with new user data
router.post('/', function(req, res, next) {

  var saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    user_type: req.body.type
  };
  console.log('new user:', saveUser);

  pool.connect(function(err, client, done) {
    client.query("INSERT INTO users (username, password, user_type) VALUES ($1, $2, $3) RETURNING id",
      [saveUser.username, saveUser.password, saveUser.user_type],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.redirect('/');
          }
        });
  });

});


module.exports = router;
