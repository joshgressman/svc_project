// connection.js
var connectionString = '';

if(process.env.DATABASE_URL != undefined) {
    // connectionString = process.env.DATABASE_URL + "?ssl=true";
    connectionString = {
      user: process.env.PGUSER, //env var: PGUSER
      database: process.env.PGDATABASE, //env var: PGDATABASE
      password: process.env.PGPASSWORD, //env var: PGPASSWORD
      port: 5432, //env var: PGPORT
      max: 1000, // max number of clients in the pool
      host: process.env.PGHOST,
      ssl: true,
      idleTimeoutMillis: 1000, // how long a client is allowed to remain idle before being closed
    };
} else {
    connectionString = {
      user: 'kimmai', //env var: PGUSER
      database: 'svc', //env var: PGDATABASE
      password: '', //env var: PGPASSWORD
      port: 5432, //env var: PGPORT
      max: 1000, // max number of clients in the pool
      idleTimeoutMillis: 1000, // how long a client is allowed to remain idle before being closed
    };
}

module.exports = connectionString;
