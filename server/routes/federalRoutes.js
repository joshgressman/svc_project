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

//POST, which are really GET requests for each field;
router.post('/total', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q1:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q1:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/new', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q4:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q4:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/ethnicity/nativeAmerican', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_ethnicity iLIKE 'Native American' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5A:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5A:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/ethnicity/asian', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_ethnicity iLIKE 'Asian' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5A:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5A:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/ethnicity/black', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_ethnicity iLIKE 'African American/Black' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5A:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5A:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/ethnicity/hispanic', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_ethnicity iLIKE 'Chican@Latina@' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5A:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5A:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/ethnicity/hawaiian', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_ethnicity iLIKE 'Native Hawaiian/Pacific Islander' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5A:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5A:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/ethnicity/caucasian', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_ethnicity iLIKE 'White non-Latino/Caucasian' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5A:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5A:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/ethnicity/other', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_ethnicity iLIKE 'Other' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5A:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5A:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/ethnicity/multiple', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_ethnicity iLIKE 'Multi-racial' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5A:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5A:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/ethnicity/unknown', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_ethnicity iLIKE 'unknown/pass' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5A:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5A:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/ethnicity/total', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE (victim_ethnicity iLIKE 'Asian' OR victim_ethnicity iLIKE 'Afrian American/Black' OR victim_ethnicity iLIKE 'Chican@Latin@' OR victim_ethnicity iLIKE 'Multi-racial' OR victim_ethnicity iLIKE 'Native American' OR victim_ethnicity iLIKE 'Native Hawaiian/Pacific Islander' OR victim_ethnicity iLIKE 'White non-Latino/Caucasian' OR victim_ethnicity iLIKE 'unknown/pass') AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5A:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5A:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/gender/male', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_gender iLIKE 'Male' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5B:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5B:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/gender/female', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_gender iLIKE 'Female' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5B:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5B:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/gender/nonbinary', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_gender iLIKE 'Non-Binary' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5B:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5B:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/gender/other', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_gender iLIKE 'Other' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5B:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5B:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/gender/unknown', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_gender iLIKE 'Unknown' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5B:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5B:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/gender/total', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE (victim_gender iLIKE 'Male' OR victim_gender iLIKE 'Female' OR victim_gender iLIKE 'Non-Binary' OR victim_gender iLIKE 'Unknown) AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5B:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5B:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/age/0-12', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE (victim_age >= '0' AND victim_age <= '12') AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5C:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5C:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/age/13-17', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE (victim_age >= '13' AND victim_age <= '17') AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5C:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5C:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/age/18-24', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE (victim_age >= '18' AND victim_age <= '24') AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5C:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5C:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/age/25-59', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE (victim_age >= '25' AND victim_age <= '59') AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5C:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5C:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/age/60', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_age >= '60' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5C:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5C:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/age/unknown', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE victim_age iLIKE 'unknown' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5C:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5C:', result.rows);
      res.send(result.rows);

    });
  });
});

router.post('/age/total', function (req, res) {
  var dateRange = req.body;
  console.log('Date range of query:', dateRange);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('ERROR, connection to PG');
      res.sendStatus(500);
    }

    client.query("SELECT COUNT (*) FROM victim WHERE (victim_age >= '0' AND victim_age iLIKE 'unknown') AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'",
    function (err, result) {
      done();

      if (err) {
        console.log('QUERY ERROR with Federal, Q5C:', err);
        res.sendStatus(500);
      }

      console.log('Federal Report, Q5C:', result.rows);
      res.send(result.rows);

    });
  });
});

module.exports = router;
