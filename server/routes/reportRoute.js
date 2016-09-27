var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = '';

if (process.env.DATABASE_URL != undefined) {
  connectionString = process.env.DATABASE_URL + '?ssl=true';
} else {
  // running locally, use our local database instead (local db create for development process);
  connectionString = 'postgres://localhost:5432/svc';
}

//GET for federal report;
router.get('/federal', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG', err);
      res.sendStatus(500);
    }

    client.query('SELECT...', function (err, result) {
      done();

      if (err) {
        console.log('GET ERROR, federal:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report:', result.rows);
      res.send(result.rows);
    });
  });
});

//GET for hennepin county report;
router.get('/hennepin', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG', err);
      res.sendStatus(500);
    }

    client.query('SELECT...', function (err, result) {
      done();

      if (err) {
        console.log('GET ERROR, hennepin:', err);
        res.sendStatus(500);
      }

      console.log('Hennepin County Report:', result.rows);
      res.send(result.rows);
    });
  });
});

//GET for summary report;
router.get('/summary', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG', err);
      res.sendStatus(500);
    }

    client.query('SELECT...', function (err, result) {
      done();

      if (err) {
        console.log('GET ERROR, summary:', err);
        res.sendStatus(500);
      }

      console.log('Summary Report:', result.rows);
      res.send(result.rows);
    });
  });
});

//GET for data playground report;
router.get('/playground', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG', err);
      res.sendStatus(500);
    }

    client.query('SELECT...', function (err, result) {
      done();

      if (err) {
        console.log('GET ERROR, playground:', err);
        res.sendStatus(500);
      }

      console.log('Playground Report:', result.rows);
      res.send(result.rows);
    });
  });
});

module.exports = router;
