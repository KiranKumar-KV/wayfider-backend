const pg = require("pg");

const pool = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "new_wayfinder_db",
  password: "root",
  port: "5432"
});

// const pool = new pg.Client({
//   connectionString: process.env["DATABASE_URL"]
//   // connectionString: "postgres://postgres:root@192.168.1.9:5400/wayfinder"
// });

module.exports = pool;
