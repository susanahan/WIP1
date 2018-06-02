const bcrypt = require("bcryptjs");
const db = require("../db/index");

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return (
    db.none(
      "INSERT INTO users (username, password) VALUES (${username}, ${password})",
      { username: req.body.username, password: hash }
    )
    .then(() => {
      return db.one('SELECT * FROM users WHERE username = ${username}', 
      { username: req.body.username })
    })
  );
}

function loginRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ status: "Forbidden - Please log in" });
  }
  return next();
}

module.exports = {
  comparePass,
  createUser,
  loginRequired
};