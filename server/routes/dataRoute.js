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

//POST requests to victim and nonvictim tables;
router.post('/victim', function (req, res) {
  var newVictim = req.body;
  console.log('new victim added:', newVictim);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG', err);
      res.sendStatus(500);
    }

    client.query('INSERT INTO victim (date_entered, advocate_name, service_location,      service_county, service_date, start_time, end_time, client_number, victim_zip, victim_type, referral_source, victim_prior_contact, victim_prior_oct, service_type, counseling_type, legal_advocacy_type, other_advocacy_type, referral_type, referral_name, violence_type, victim_age, victim_gender, victim_trans, victim_pronoun, victim_sexual_orientation, victim_disability, victim_ethnicity, victim_immigrant) ' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)',
    [newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something, newVictim.something],
    function (err, result) {
      done();

      if (err) {
        console.log('POST ERROR, victim:', err);
        res.sendStatus(500);
      }else {
        res.sendStatus(201);
      }
    });
  });
});

router.post('/nonvictim', function (req, res) {
  var newNonVictim = req.body;
  console.log('new nonvictim added:', newNonVictim);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG:', err);
      res.sendStatus(500);
    }

    client.query('INSERT INTO nonvictim (date_entered, advocate_name, contact_date, start_time, end_time, caller_name, caller_phone, caller_zip, caller_county, caller_org_type, caller_org_name, call_type, call_referral_type, call_referral_name, referral_source, advocacy_request, advocacy_location, advocacy_med, advocacy_med_responder, advocate_dispatched, dispatched_notes) ' + 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)', [newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something, newNonVictim.something], function (err, result) {
      done();

      if (err) {
        console.log('POST ERROR, nonvictim', err);
        res.sendStatus(500);
      }else {
        res.sendStatus(201);
      }
    });
  });
});

//PUT request to victim and nonvictim tables;
router.put('/victim/:id', function (req, res) {
  var id = req.params.id;
  var victim = req.body;
  console.log('Victim ID to change:', id);
  console.log('Modified info:', victim);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG', err);
      res.sendStatus(500);
    }

    client.query('UPDATE victim ' +
                'SET date_entered = $1, ' +
                'advocate_name = $2, ' +
                'service_location = $3, ' +
                'service_county = $4, ' +
                'service_date = $5, ' +
                'start_time = $6, ' +
                'end_time = $7, ' +
                'client_number = $8, ' +
                'victim_zip = $9, ' +
                'victim_type = $10, ' +
                'referral_source = $11, ' +
                'victim_prior_contact + $12, ' +
                'victim_prior_oct = $13, ' +
                'service_type = $14, ' +
                'counseling_type = $15, ' +
                'legal_advocacy_type = $16, ' +
                'other_advocacy_type = $17, ' +
                'referral_type = $18, ' +
                'referral_name = $19, ' +
                'violence_type = $20, ' +
                'victim_age = $21, ' +
                'victim_gender = $22, ' +
                'victim_trans = $23, ' +
                'victim_pronoun = $24, ' +
                'victim_sexual_orientation = $25, ' +
                'victim_disability = $26, ' +
                'victim_ethnicity = $27, ' +
                'victim_immigrant = $28 ' +
                'WHERE id = $29',
                [victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, victim.something, id],
                function (err, result) {
                  done();

                  if (err) {
                    console.log('PUT ERROR, victim:', err);
                    res.sendStatus(500);
                  }else {
                    res.sendStatus(200);
                  }
                });
  });
});

router.put('/nonvictim/:id', function (req, res) {
  var id = req.params.id;
  var nonVictim = req.body;
  console.log('NonVictim ID to change:', id);
  console.log('Modified info:', nonVictim);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG', err);
      res.sendStatus(500);
    }

    client.query('UPDATE nonvictim ' +
                'date_entered = $1, ' +
                'advocate_name = $2, ' +
                'contact_date = $3, ' +
                'start_time = $4, ' +
                'end_time = $5, ' +
                'caller_name = $6, ' +
                'caller_phone = $7, ' +
                'caller_zip = $8, ' +
                'caller_county = $9, ' +
                'caller_org_type = $10, ' +
                'caller_org_name = $11, ' +
                'call_type = $12, ' +
                'call_referral_type = $13, ' +
                'call_referral_name = $14, ' +
                'referral_source = $15, ' +
                'advocacy_request = $16, ' +
                'advocacy_location = $17, ' +
                'advocacy_med = $18, ' +
                'advocacy_med_responder = $19, ' +
                'advocate_dispatched = $20, ' +
                'dispatched_notes = $21 ' +
                'WHERE id = $22',
                [nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, nonVictim.something, id],
                function (err, result) {
                  done();

                  if (err) {
                    console.log('PUT ERROR, nonvictim:', err);
                    res.sendStatus(500);
                  }else {
                    res.sendStatus(200);
                  }
                });
  });
});

//DELETE request to vicitm and nonvictim tables;
router.delete('/victim/:id', function (req, res) {
  var id = req.params.id;
  console.log('VICTIM record to delete:', id);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG', err);
      res.sendStatus(500);
    }

    client.query('DELETE FROM victim ' +
                  'WHERE id = $1',
                  [id],
                  function (err, result) {
                    done();

                    if (err) {
                      console.log('DELETE ERROR, victim:', err);
                      res.sendStatus(500);
                      return;
                    }

                    res.sendStatus(200);
                  });
  });
});

router.delete('/nonvictim/:id', function (req, res) {
  var id = req.params.id;
  console.log('NONVICTIM record to delete:', id);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG', err);
      res.sendStatus(500);
    }

    client.query('DELETE FROM nonvictim ' +
                  'WHERE id = $1',
                  [id],
                  function (err, result) {
                    done();

                    if (err) {
                      console.log('DELETE ERROR, nonvictim:', err);
                      res.sendStatus(500);
                      return;
                    }

                    res.sendStatus(200);
                  });
  });
});

module.exports = router;
