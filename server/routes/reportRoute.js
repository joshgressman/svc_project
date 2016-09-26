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

//GET for hennepin county report;

//GET for summary report;

//GET for data playground report;

module.exports = router;
