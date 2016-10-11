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
    var checkFirstTimer = " AND ((victim_prior_contact is false AND victim_prior_oct is null) OR (victim_prior_contact is true AND victim_prior_oct is true)) ";
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
            // console.log('new:', query);
        } else if (table == "victim_age") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victim age:', query);
        } else if (table == "victim_sexual_orientation_total") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('sexual orientation:', query);
        // } else if (table ==  "victim_victimization_count") {
        //     query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
        //     // console.log('victimization count:', query);
        } else if (table ==  "victim_ethnicity_total") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('ethnicity:', query);
        } else if (table == "victim_gender_total") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('gender:', query);

        } else if (table ==  "disability_total_unique") {
            query = stringQueryWhere + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('disability_total_unique:', query);
        } else if (table ==  "criminal_civic_unique") {
            query = stringQueryWhere + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('criminal_civic_unique:', query);
        } else if (table ==  "medical_advocacy_unique") {
            query = stringQueryWhere + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('medical_advocacy_unique:', query);
        } else if (table ==  "personal_advocacy_unique") {
            query = stringQueryWhere + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('personal_advocacy_unique:', query);
        } else if (table ==  "criminal_justice_unique") {
            query = stringQueryWhere + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('criminal_justice_unique:', query);
        } else if (table ==  "exception_compensation_unique") {
            query = stringQueryWhere + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('exception_compensation_unique:', query);

        } else if (table ==  "victim_immigrant_total") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('immigrant:', query);
        // } else if (text == "hotline_crisis") {
        //     stringQueryWhere = "SELECT COUNT (*) FROM victim WHERE";
        //     greaterThanOrEqual = " contact_date >= "
        //     query = stringQueryWhere + "'" + text + "'" + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
        //     // console.log('hotline:', query);
        } else if (text == "true"){
            query = stringQueryWhere + table + is + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log(query);
        } else if (text == null){
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
//Search query for search / update function //
router.post('/county/edit', function(req, res) {
var table = req.body.table;
var number = req.body.number;
console.log(table);
console.log(number);
pg.connect(connectionString, function (err, client, done){
  if(err){
    res.sendStatus(500);

    }
    client.query('SELECT * FROM ' + table + ' WHERE id = ' + number,
    function(err, result){
      done();

      if(err){
        console.log('SEARCH QUERY', err);
        res.sendStatus(500);
      }
      console.log('SEARCH QUERY RESULTS', result.rows);
      res.send(result.rows);

    });

  



});
});

//POST-GET for hennepin reports;
router.post('/county/:id', function(req, res) {
    var stringQueryWhere = "SELECT COUNT (*) FROM victim WHERE ";
    var selectDistinct = "SELECT DISTINCT service_location FROM victim WHERE "
    var iLike = " iLIKE ";
    var is = " is ";
    var checkFirstTimer = " AND ((victim_prior_contact is false AND victim_prior_oct is null) OR (victim_prior_contact is true AND victim_prior_oct is true)) ";
    var greaterThanOrEqual = " AND contact_date >= ";
    var lessThan = " AND contact_date < ";
    var query = "";
    var hennepin = "(victim_zipcode = 55111 OR victim_zipcode = 55305 OR victim_zipcode = 55311 OR victim_zipcode = 55316 OR victim_zipcode = 55317 OR victim_zipcode = 55327 OR victim_zipcode = 55328 OR victim_zipcode = 55331 OR victim_zipcode = 55340 OR victim_zipcode = 55341 OR victim_zipcode = 55343 OR victim_zipcode = 55344 OR victim_zipcode = 55345 OR victim_zipcode = 55346 OR victim_zipcode = 55347 OR victim_zipcode = 55356 OR victim_zipcode = 55357 OR victim_zipcode = 55359 OR victim_zipcode = 55361 OR victim_zipcode = 55364 OR victim_zipcode = 55369 OR victim_zipcode = 55373 OR victim_zipcode = 55374 OR victim_zipcode = 55375 OR victim_zipcode = 55384 OR victim_zipcode = 55387 OR victim_zipcode = 55388 OR victim_zipcode = 55391 OR victim_zipcode = 55392 OR victim_zipcode = 55401 OR victim_zipcode = 55402 OR victim_zipcode = 55403 OR victim_zipcode = 55404 OR victim_zipcode = 55405 OR victim_zipcode = 55406 OR victim_zipcode = 55407 OR victim_zipcode = 55408 OR victim_zipcode = 55409 OR victim_zipcode = 55410 OR victim_zipcode = 55411 OR victim_zipcode = 55412 OR victim_zipcode = 55413 OR victim_zipcode = 55414 OR victim_zipcode = 55415 OR victim_zipcode = 55416 OR victim_zipcode = 55417 OR victim_zipcode = 55418 OR victim_zipcode = 55419 OR victim_zipcode = 55420 OR victim_zipcode = 55422 OR victim_zipcode = 55423 OR victim_zipcode = 55424 OR victim_zipcode = 55425 OR victim_zipcode = 55426 OR victim_zipcode = 55427 OR victim_zipcode = 55428 OR victim_zipcode = 55429 OR victim_zipcode = 55230 OR victim_zipcode = 55431 OR victim_zipcode = 55435 OR victim_zipcode = 55436 OR victim_zipcode = 55437 OR victim_zipcode = 55438 OR victim_zipcode = 55439 OR victim_zipcode = 55441 OR victim_zipcode = 55442 OR victim_zipcode = 55443 OR victim_zipcode = 55444 OR victim_zipcode = 55445 OR victim_zipcode = 55446 OR victim_zipcode = 55447 OR victim_zipcode = 55450 OR victim_zipcode = 55454 OR victim_zipcode = 55455)";
    var notHennepin = "(victim_zipcode != 55111 AND victim_zipcode != 55305 AND victim_zipcode != 55311 AND victim_zipcode != 55316 AND victim_zipcode != 55317 AND victim_zipcode != 55327 AND victim_zipcode != 55328 AND victim_zipcode != 55331 AND victim_zipcode != 55340 AND victim_zipcode != 55341 AND victim_zipcode != 55343 AND victim_zipcode != 55344 AND victim_zipcode != 55345 AND victim_zipcode != 55346 AND victim_zipcode != 55347 AND victim_zipcode != 55356 AND victim_zipcode != 55357 AND victim_zipcode != 55359 AND victim_zipcode != 55361 AND victim_zipcode != 55364 AND victim_zipcode != 55369 AND victim_zipcode != 55373 AND victim_zipcode != 55374 AND victim_zipcode != 55375 AND victim_zipcode != 55384 AND victim_zipcode != 55387 AND victim_zipcode != 55388 AND victim_zipcode != 55391 AND victim_zipcode != 55392 AND victim_zipcode != 55401 AND victim_zipcode != 55402 AND victim_zipcode != 55403 AND victim_zipcode != 55404 AND victim_zipcode != 55405 AND victim_zipcode != 55406 AND victim_zipcode != 55407 AND victim_zipcode != 55408 AND victim_zipcode != 55409 AND victim_zipcode != 55410 AND victim_zipcode != 55411 AND victim_zipcode != 55412 AND victim_zipcode != 55413 AND victim_zipcode != 55414 AND victim_zipcode != 55415 AND victim_zipcode != 55416 AND victim_zipcode != 55417 AND victim_zipcode != 55418 AND victim_zipcode != 55419 AND victim_zipcode != 55420 AND victim_zipcode != 55422 AND victim_zipcode != 55423 AND victim_zipcode != 55424 AND victim_zipcode != 55425 AND victim_zipcode != 55426 AND victim_zipcode != 55427 AND victim_zipcode != 55428 AND victim_zipcode != 55429 AND victim_zipcode != 55230 AND victim_zipcode != 55431 AND victim_zipcode != 55435 AND victim_zipcode != 55436 AND victim_zipcode != 55437 AND victim_zipcode != 55438 AND victim_zipcode != 55439 AND victim_zipcode != 55441 AND victim_zipcode != 55442 AND victim_zipcode != 55443 AND victim_zipcode != 55444 AND victim_zipcode != 55445 AND victim_zipcode != 55446 AND victim_zipcode != 55447 AND victim_zipcode != 55450 AND victim_zipcode != 55454 AND victim_zipcode != 55455)";
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
            // stringQueryWhere = "SELECT COUNT (*) FROM victim WHERE";
            // greaterThanOrEqual = " contact_date >= ";
            query = stringQueryWhere + hennepin + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('total:', query);
        } else if (text == "NEW") {
            // checkFirstTimer = " (victim_prior_contact is false AND victim_prior_oct is null) OR (victim_prior_contact is true AND victim_prior_oct is true) ";
            query = stringQueryWhere + hennepin + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('new:', query);
        } else if (table ==  "victim_zipcode") {
            query = stringQueryWhere + table + " = '" + text + "'" + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victim age:', query);
        } else if (table ==  "victim_zipcode_unknown") {
            query = stringQueryWhere + " victim_zipcode is null" + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
        //     // console.log('victim age unknown:', query);
        } else if (table ==  "victim_zipcode_other") {
            query = stringQueryWhere + notHennepin + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victim age other:', query);
        } else if (table ==  "victim_zipcode_total") {
            query = stringQueryWhere + hennepin + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victim age other:', query);
        } else if (table ==  "victim_ethnicity_total") {
            query = stringQueryWhere + hennepin + " AND " + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('ethnicity total:', query);
        } else if (table ==  "victim_age") {
            query = stringQueryWhere + hennepin + " AND " + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victim age:', query);
        } else if (table ==  "victim_age_unknown") {
            query = stringQueryWhere + hennepin + " AND " + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victim age:', query);
        } else if (table ==  "victim_sexual_orientation_total") {
            query = stringQueryWhere + hennepin + " AND " + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('sexual orientation:', query);

        // } else if (table ==  "victim_victimization_count") {
        //     query = stringQueryWhere + hennepin + " AND " + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
        //     // console.log('victimization count:', query);

        } else if (table ==  "victim_gender_total") {
            query = stringQueryWhere + hennepin + " AND " + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('gender:', query);
        } else if (table ==  "victim_immigrant_total") {
            query = stringQueryWhere + hennepin + " AND " + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('immigrant:', query);
        // } else if (text == "hotline_crisis") {
        //     stringQueryWhere = "SELECT COUNT (*) FROM victim WHERE";
        //     greaterThanOrEqual = " contact_date >= "
        //     query = stringQueryWhere + "'" + text + "'" + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
        //     console.log('hotline:', query);
        } else if (table ==  "locations") {
            query = selectDistinct + hennepin + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('SPECIAL', query);
        } else if (text == null){
            query = stringQueryWhere + hennepin + " AND (" + table + is + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "')";
            // console.log(query);
        } else if (text == "true"){
            query = stringQueryWhere + hennepin + " AND (" + table + is + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "')";
            // console.log('all boolean:', query);
        } else {
            query = stringQueryWhere + hennepin + " AND (" + table + iLike + "'" + text + "'" + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "')";
            // console.log('other queries:', query);
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

router.post('/county/locations', function (req, res) {
    var selectDistinct = "SELECT DISTINCT service_location FROM victim WHERE "
    var hennepin = "(victim_zipcode = 55111 OR victim_zipcode = 55305 OR victim_zipcode = 55311 OR victim_zipcode = 55316 OR victim_zipcode = 55317 OR victim_zipcode = 55327 OR victim_zipcode = 55328 OR victim_zipcode = 55331 OR victim_zipcode = 55340 OR victim_zipcode = 55341 OR victim_zipcode = 55343 OR victim_zipcode = 55344 OR victim_zipcode = 55345 OR victim_zipcode = 55346 OR victim_zipcode = 55347 OR victim_zipcode = 55356 OR victim_zipcode = 55357 OR victim_zipcode = 55359 OR victim_zipcode = 55361 OR victim_zipcode = 55364 OR victim_zipcode = 55369 OR victim_zipcode = 55373 OR victim_zipcode = 55374 OR victim_zipcode = 55375 OR victim_zipcode = 55384 OR victim_zipcode = 55387 OR victim_zipcode = 55388 OR victim_zipcode = 55391 OR victim_zipcode = 55392 OR victim_zipcode = 55401 OR victim_zipcode = 55402 OR victim_zipcode = 55403 OR victim_zipcode = 55404 OR victim_zipcode = 55405 OR victim_zipcode = 55406 OR victim_zipcode = 55407 OR victim_zipcode = 55408 OR victim_zipcode = 55409 OR victim_zipcode = 55410 OR victim_zipcode = 55411 OR victim_zipcode = 55412 OR victim_zipcode = 55413 OR victim_zipcode = 55414 OR victim_zipcode = 55415 OR victim_zipcode = 55416 OR victim_zipcode = 55417 OR victim_zipcode = 55418 OR victim_zipcode = 55419 OR victim_zipcode = 55420 OR victim_zipcode = 55422 OR victim_zipcode = 55423 OR victim_zipcode = 55424 OR victim_zipcode = 55425 OR victim_zipcode = 55426 OR victim_zipcode = 55427 OR victim_zipcode = 55428 OR victim_zipcode = 55429 OR victim_zipcode = 55230 OR victim_zipcode = 55431 OR victim_zipcode = 55435 OR victim_zipcode = 55436 OR victim_zipcode = 55437 OR victim_zipcode = 55438 OR victim_zipcode = 55439 OR victim_zipcode = 55441 OR victim_zipcode = 55442 OR victim_zipcode = 55443 OR victim_zipcode = 55444 OR victim_zipcode = 55445 OR victim_zipcode = 55446 OR victim_zipcode = 55447 OR victim_zipcode = 55450 OR victim_zipcode = 55454 OR victim_zipcode = 55455)";
    var checkFirstTimer = " AND ((victim_prior_contact is false AND victim_prior_oct is null) OR (victim_prior_contact is true AND victim_prior_oct is true)) ";
    var greaterThanOrEqual = " AND contact_date >= ";
    var lessThan = " AND contact_date < ";
    var dateStart = req.body.start;
    var dateEnd = req.body.end;

    pg.connect(connectionString, function (err, client, done) {
        if (err) {
          console.log('ERROR, connection to PG', err);
          res.sendStatus(500);
        }

        query = selectDistinct + hennepin + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
        console.log('SPECIAL', query);

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

//GETPOST for Playground;

router.post('/playground/victim/:id', function(req, res) {

    var stringQueryWhere = "SELECT (victim_type) FROM victim WHERE ";
    var selectDistinct = "SELECT DISTINCT service_location FROM victim WHERE "
    var iLike = " iLIKE ";
    var is = " is ";
    var checkFirstTimer = " AND ((victim_prior_contact is false AND victim_prior_oct is null) OR (victim_prior_contact is true AND victim_prior_oct is true)) ";
    var greaterThanOrEqual = " AND contact_date >= ";
    var lessThan = " AND contact_date < ";
    var query = "";
    var hennepin = "(victim_zipcode = 55111 OR victim_zipcode = 55305 OR victim_zipcode = 55311 OR victim_zipcode = 55316 OR victim_zipcode = 55317 OR victim_zipcode = 55327 OR victim_zipcode = 55328 OR victim_zipcode = 55331 OR victim_zipcode = 55340 OR victim_zipcode = 55341 OR victim_zipcode = 55343 OR victim_zipcode = 55344 OR victim_zipcode = 55345 OR victim_zipcode = 55346 OR victim_zipcode = 55347 OR victim_zipcode = 55356 OR victim_zipcode = 55357 OR victim_zipcode = 55359 OR victim_zipcode = 55361 OR victim_zipcode = 55364 OR victim_zipcode = 55369 OR victim_zipcode = 55373 OR victim_zipcode = 55374 OR victim_zipcode = 55375 OR victim_zipcode = 55384 OR victim_zipcode = 55387 OR victim_zipcode = 55388 OR victim_zipcode = 55391 OR victim_zipcode = 55392 OR victim_zipcode = 55401 OR victim_zipcode = 55402 OR victim_zipcode = 55403 OR victim_zipcode = 55404 OR victim_zipcode = 55405 OR victim_zipcode = 55406 OR victim_zipcode = 55407 OR victim_zipcode = 55408 OR victim_zipcode = 55409 OR victim_zipcode = 55410 OR victim_zipcode = 55411 OR victim_zipcode = 55412 OR victim_zipcode = 55413 OR victim_zipcode = 55414 OR victim_zipcode = 55415 OR victim_zipcode = 55416 OR victim_zipcode = 55417 OR victim_zipcode = 55418 OR victim_zipcode = 55419 OR victim_zipcode = 55420 OR victim_zipcode = 55422 OR victim_zipcode = 55423 OR victim_zipcode = 55424 OR victim_zipcode = 55425 OR victim_zipcode = 55426 OR victim_zipcode = 55427 OR victim_zipcode = 55428 OR victim_zipcode = 55429 OR victim_zipcode = 55230 OR victim_zipcode = 55431 OR victim_zipcode = 55435 OR victim_zipcode = 55436 OR victim_zipcode = 55437 OR victim_zipcode = 55438 OR victim_zipcode = 55439 OR victim_zipcode = 55441 OR victim_zipcode = 55442 OR victim_zipcode = 55443 OR victim_zipcode = 55444 OR victim_zipcode = 55445 OR victim_zipcode = 55446 OR victim_zipcode = 55447 OR victim_zipcode = 55450 OR victim_zipcode = 55454 OR victim_zipcode = 55455)";
    var notHennepin = "(victim_zipcode != 55111 AND victim_zipcode != 55305 AND victim_zipcode != 55311 AND victim_zipcode != 55316 AND victim_zipcode != 55317 AND victim_zipcode != 55327 AND victim_zipcode != 55328 AND victim_zipcode != 55331 AND victim_zipcode != 55340 AND victim_zipcode != 55341 AND victim_zipcode != 55343 AND victim_zipcode != 55344 AND victim_zipcode != 55345 AND victim_zipcode != 55346 AND victim_zipcode != 55347 AND victim_zipcode != 55356 AND victim_zipcode != 55357 AND victim_zipcode != 55359 AND victim_zipcode != 55361 AND victim_zipcode != 55364 AND victim_zipcode != 55369 AND victim_zipcode != 55373 AND victim_zipcode != 55374 AND victim_zipcode != 55375 AND victim_zipcode != 55384 AND victim_zipcode != 55387 AND victim_zipcode != 55388 AND victim_zipcode != 55391 AND victim_zipcode != 55392 AND victim_zipcode != 55401 AND victim_zipcode != 55402 AND victim_zipcode != 55403 AND victim_zipcode != 55404 AND victim_zipcode != 55405 AND victim_zipcode != 55406 AND victim_zipcode != 55407 AND victim_zipcode != 55408 AND victim_zipcode != 55409 AND victim_zipcode != 55410 AND victim_zipcode != 55411 AND victim_zipcode != 55412 AND victim_zipcode != 55413 AND victim_zipcode != 55414 AND victim_zipcode != 55415 AND victim_zipcode != 55416 AND victim_zipcode != 55417 AND victim_zipcode != 55418 AND victim_zipcode != 55419 AND victim_zipcode != 55420 AND victim_zipcode != 55422 AND victim_zipcode != 55423 AND victim_zipcode != 55424 AND victim_zipcode != 55425 AND victim_zipcode != 55426 AND victim_zipcode != 55427 AND victim_zipcode != 55428 AND victim_zipcode != 55429 AND victim_zipcode != 55230 AND victim_zipcode != 55431 AND victim_zipcode != 55435 AND victim_zipcode != 55436 AND victim_zipcode != 55437 AND victim_zipcode != 55438 AND victim_zipcode != 55439 AND victim_zipcode != 55441 AND victim_zipcode != 55442 AND victim_zipcode != 55443 AND victim_zipcode != 55444 AND victim_zipcode != 55445 AND victim_zipcode != 55446 AND victim_zipcode != 55447 AND victim_zipcode != 55450 AND victim_zipcode != 55454 AND victim_zipcode != 55455)";
    
    var dateStart = req.body.startDate;
    var dateEnd = req.body.endDate;
    var start = req.body.start;
    var end = req.body.end;

    var text = req.body.text;
    var textSpecial = req.body.textSpecial;
    var table = req.params.id

    pg.connect(connectionString, function(err, client, done) {

        if (text == "TOTAL") {

            query = "SELECT (victim_type) FROM victim where contact_date >= '" + dateStart + "' AND contact_date < '" + dateEnd + "'";
            // console.log('playground total:', query);
        } else if (text == "NEW") {
            checkFirstTimer = " ((victim_prior_contact is false AND victim_prior_oct is null) OR (victim_prior_contact is true AND victim_prior_oct is true)) ";
            query = stringQueryWhere + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('playground new:', query);
        } else if (table ==  "victim_ethnicity_total") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('ethnicity total:', query);
        } else if (table ==  "victim_zipcode") {
            query = stringQueryWhere + table + " = '" + text + "'" + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victim zipcode:', query);
        } else if (table ==  "victim_zipcode_unknown") {
            query = stringQueryWhere + " victim_zipcode is null" + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
        //     // console.log('victim age unknown:', query);
        } else if (table ==  "victim_zipcode_other") {
            query = stringQueryWhere + notHennepin + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victim age other:', query);
        } else if (table ==  "victim_zipcode_total") {
            query = stringQueryWhere + hennepin + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victim age other:', query);
        } else if (table ==  "victim_age") {
            query = stringQueryWhere + "(victim_age >= " + start + " AND victim_age <= " + end + ") "+ checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victim age:', query);
        } else if (table ==  "victim_age_unknown") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('victim age:', query);
        } else if (table ==  "victim_sexual_orientation_total") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
        } else if (table ==  "victim_gender_total") {
            query = stringQueryWhere + textSpecial + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('gender:', query);
        } else if (table ==  "victim_immigrant_total") {
            query = stringQueryWhere + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('immigrant:', query);                
        } else if (text == null) {
            query = stringQueryWhere + table + is + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('playground nulls:', query);
        } else if (text == "true") {
            query = stringQueryWhere + table + is + text + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('playground trues:', query);                   
        } else {
            query = stringQueryWhere + table + iLike + "'" + text + "'" + checkFirstTimer + greaterThanOrEqual + "'" + dateStart + "'" + lessThan + "'" + dateEnd + "'";
            // console.log('other queries:', query);
        }
        client.query(query,
            function(err, result) {
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

   

//GET ALL for data playground report;

router.post('/playground/nonVictim', function(req, res) {
    var start = req.body.start;
    var end = req.body.end;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG', err);
            res.sendStatus(500);
        }

        client.query("SELECT * from nonvictim where contact_date >= '" + start + "' AND contact_date <= '" + end + "'",
            function(err, result) {
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




router.post('/playground/victim', function(req, res) {
    var start = req.body.start;
    var end = req.body.end;
    console.log(start);
    console.log(end);
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG', err);
            res.sendStatus(500);
        }
        client.query("SELECT * from victim where contact_date >= '" + start + "' AND contact_date <= '" + end + "'",
            function(err, result) {
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

router.get('/playground', function(req, res) {
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('ERROR, connection to PG', err);
            res.sendStatus(500);
        }

        client.query('SELECT * FROM victim ORDER BY contact_date ASC', function(err, result) {
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
