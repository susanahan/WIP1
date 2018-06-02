var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/oauth_test";
var db = pgp(connectionString);

module.exports = db;