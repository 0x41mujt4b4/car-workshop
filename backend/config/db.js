const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "hbstudent",
  password: "hbstudent",
  connectionLimit: 10,
});

module.exports = pool;
