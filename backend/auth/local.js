const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
const config           = require('../config.js');
const db = require("../db/index");
const init = require("./passport");
const authHelpers = require("./helpers");

const options = {};

init();

passport.use(new LocalStrategy(options, (username, password, done) => {
    console.log("trying to authenticate", username, password);
    db
        .any('SELECT * FROM users WHERE username=${username}', {username: username})
        .then(rows => {
        const user = rows[0];
        console.log("user: ", user);
        if (!user) {
            return done(null, false);
        }
        if (!authHelpers.comparePass(password, user.password)) {
            return done(null, false);
        } else {
            return done(null, user);
        }
        })
        .catch(err => {
        return done(err);
        });
    })
)


passport.use(new GoogleStrategy({
    clientID     : config.googleAuth.clientID,
    clientSecret : config.googleAuth.clientSecret,
    callbackURL  : config.googleAuth.callbackURL    
    },

    function(token, refreshToken, profile, done) {
    console.log('HIIIII ')
        return done(null, {
            profile: profile,
            token: token
        });
    
    }
));
  
module.exports = passport;
    