var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/connection')

var pool = new pg.Pool(connectionString);

router.get('/', function(req, res) {

  pool.connect(function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT * FROM users ORDER BY username ASC",
      function(err, result) {
        console.log('what up');
        done();

        if(err) {
          console.log("select error: ", err);
          res.sendStatus(500);
        }
        console.log('results: ', result);
        res.send(result.rows);
    });

  });
});

module.exports = router;
