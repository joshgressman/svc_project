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


//POST-GET for federal reports;
router.post('/federal/:id', function(req, res) {
    var stringQueryWhere = "SELECT COUNT (*) FROM victim WHERE ";
    var iLike = " iLIKE ";
    var is = " is ";
    var checkFirstTimer = " AND (victim_prior_contact is false AND victim_prior_oct is null) OR (victim_prior_contact is true AND victim_prior_oct is true) ";
    var greaterThanOrEqual = " AND contact_date >= ";
    var lessThan = " AND contact_date <= ";
    var query = "";
    var dateStart = req.body.start;
    var dateEnd = req.body.end;
    var text = req.body.text;
    var textSpecial = req.body.textSpecial;
    // console.log(text);
    var table = req.params.id
    // console.log('Date range of query: ' + dateStart + " - " + dateEnd);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG');
            res.sendStatus(500);
        }
        if (text == "TOTAL") {
            stringQueryWhere = "SELECT COUNT (*) FROM victim WHERE";
            greaterThanOrEqual = " contact_date >= "
            query = stringQueryWhere + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('total:', query);
        } else if (text == "NEW") {
            checkFirstTimer = " (victim_prior_contact is false AND victim_prior_oct is null) OR (victim_prior_contact is true AND victim_prior_oct is true) ";
            query = stringQueryWhere + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            console.log('new:', query);
        } else if (table ==  "victim_age") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            console.log('victim age:', query);
        } else if (table ==  "victim_sexual_orientation_total") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('sexual orientation:', query);
        } else if (table ==  "victim_victimization_count") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victimization count:', query);
        } else if (table ==  "victim_ethnicity_total") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('ethnicity:', query);
        } else if (table ==  "victim_gender_total") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('gender:', query);
        } else if (table ==  "victim_immigrant_total") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('immigrant:', query);
        } else if (text == "hotline_crisis") {
            stringQueryWhere = "SELECT COUNT (*) FROM victim WHERE";
            greaterThanOrEqual = " contact_date >= "
            query = stringQueryWhere + "'" + text + "'" + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('hotline:', query);
        } else if (text == "true"){
            query = stringQueryWhere + table + is + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log(query);
        } else {
            query = stringQueryWhere + table + iLike + "'" + text + "'" + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log(query);
        }
        client.query(query,
            function(err, result) {
                done();

                if (err) {
                    console.log('FEDERAL QUERY ERROR:', err);
                    res.sendStatus(500);
                }

                console.log('FEDERAL QUERY RESULTS:', result.rows);
                res.send(result.rows);

            });
    });
});

//POST-GET for hennepin reports;
router.post('/county/:id', function(req, res) {
    var stringQueryWhere = "SELECT COUNT (*) FROM victim WHERE ";
    var iLike = " iLIKE ";
    var is = " is ";
    var checkFirstTimer = " AND (victim_prior_contact is false AND victim_prior_oct is null) OR (victim_prior_contact is true AND victim_prior_oct is true) ";
    var greaterThanOrEqual = " AND contact_date >= ";
    var lessThan = " AND contact_date < ";
    var query = "";
    var county = " service_county iLIKE 'hennepin' AND "
    var equals = " = "
    var primary = "victim_type iLIKE 'adultPrimaryVictim' OR 'youthPrimaryVictim' AND "
    var secondary = "victim_type iLIKE 'adultSecondaryVictim' OR 'youthSecondaryVictim' AND "
    var dateStart = req.body.start;
    var dateEnd = req.body.end;
    var text = req.body.text;
    var textSpecial = req.body.textSpecial;
    // console.log(text);
    var table = req.params.id
    // console.log('Date range of query: ' + dateStart + " - " + dateEnd);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG');
            res.sendStatus(500);
        }
        if (text == "TOTAL") {
            stringQueryWhere = "SELECT COUNT (*) FROM victim WHERE";
            greaterThanOrEqual = " contact_date >= "
            query = stringQueryWhere + county + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('total:', query);
        } else if (text == "NEW") {
            checkFirstTimer = " (victim_prior_contact is false AND victim_prior_oct is null) OR (victim_prior_contact is true AND victim_prior_oct is true) ";
            query = stringQueryWhere + county + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('new:', query);
        } else if (table ==  "victim_zipcode") {
            query = stringQueryWhere + county + table + equals + "'" + text + "'" + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victim age:', query);
        } else if (table ==  "victim_ethnicity_total") {
            query = stringQueryWhere + county + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('ethnicity:', query);
        } else if (table ==  "victim_age") {
            query = stringQueryWhere + county + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victim age:', query);
        } else if (table ==  "victim_sexual_orientation_total") {
            query = stringQueryWhere + county + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('sexual orientation:', query);
        } else if (table ==  "victim_victimization_count") {
            query = stringQueryWhere + county + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victimization count:', query);

        } else if (table ==  "victim_gender_total") {
            query = stringQueryWhere + county + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('gender:', query);
        } else if (table ==  "victim_immigrant_total") {
            query = stringQueryWhere + county + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('immigrant:', query);
        } else if (text == "hotline_crisis") {
            stringQueryWhere = "SELECT COUNT (*) FROM victim WHERE";
            greaterThanOrEqual = " contact_date >= "
            query = stringQueryWhere + "'" + text + "'" + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('hotline:', query);
        } else if (text == "true"){
            query = stringQueryWhere + county + table + is + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log(query);
        } else {
            query = stringQueryWhere + county + table + iLike + "'" + text + "'" + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log(query);
        }
        client.query(query,
            function(err, result) {
                done();

                if (err) {
                    console.log('COUNTY QUERY ERROR:', err);
                    res.sendStatus(500);
                }

                console.log('COUNTY QUERY RESULTS:', result.rows);
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
