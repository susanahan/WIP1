const passport         = require('passport'),
db               = require('../db/index');

module.exports = () => {
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("desirealize");
  db
  .one('SELECT users.id, users.username, users.password,' + 
        'facebook.fb_token, facebook.fb_email, facebook.fb_name,' +
        'google.g_token, google.g_id, google.g_email, google.g_name' +
        'FROM users' +
        'LEFT OUTER JOIN facebook on facebook.id = users.id' +
        'LEFT OUTER JOIN google on google.id = users.id' +
        'WHERE users.id = ${1}', [id])
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});
}
