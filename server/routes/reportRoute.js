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

//POST-GET for reports;
router.post('/:id', function(req, res) {
  var stringQueryWhere = "SELECT COUNT (*) FROM victim WHERE ";
  var iLike = " iLIKE ";
  var checkFirstTimer = " AND victim_prior_contact is null AND victim_prior_oct is true ";
  var greaterThanOrEqual = " AND contact_date >= ";
  var lessThan = " AND contact_date < ";
    var query = "";
    var dateStart = req.body.start;
    var dateEnd = req.body.end;
    var text = "'" + req.body.text + "'";
    console.log(text);
    var table = req.params.id
    console.log('Date range of query: ' + dateStart + " - " + dateEnd);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG');
            res.sendStatus(500);
        }
        if (text == "'TOTAL'") {
            stringQueryWhere = "SELECT COUNT (*) FROM victim WHERE";
            greaterThanOrEqual = " contact_date >= "
            query = stringQueryWhere + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
        } else if (text == "'NEW'") {
            checkFirstTimer = " victim_prior_contact is null AND victim_prior_oct is true ";
            query = stringQueryWhere + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
        } else if (table ==  "victim_age") {
            query = stringQueryWhere + table + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
        } else if (table ==  "victim_sexual_orientation") {
            query = stringQueryWhere + table + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
        } else {
            query = stringQueryWhere + table + iLike + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
        }
        client.query(query,
            function(err, result) {
                done();

                if (err) {
                    console.log('QUERY ERROR:', err);
                    res.sendStatus(500);
                }

                console.log('QUERY RESULTS:', result.rows);
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

    client.query('SELECT * FROM victim ORDER BY contact_date ASC', function (err, result) {
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
