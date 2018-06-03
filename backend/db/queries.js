let db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

function loginUser(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    console.log('loginUser user', user)
    if (err) {
      res
        .status(500)
        .send("error while trying to log in");
    } else if (!user) {
      res
        .status(401)
        .send("invalid username/password");
    } else if (user) {
      req
        .logIn(user, function (err) {
          if (err) {
            res
              .status(500)
              .send("error");
          } else {
            res
              .status(200)
              .send(user);
          }
        });
    }
  })(req, res, next);
};

function registerUser(req, res, next) {
  // Here, req.body is { username, password } var user = req.body; Before making
  // the account, try and fetch a username to see if it already exists.
  return authHelpers
    .createUser(req)
    .then(response => {
      passport.authenticate("local", (err, user, info) => {
        console.log('registerUser', user);

        if (user) {
          res
            .status(200)
            .json({status: "success", data: user, message: "Registered one user"});
        }
      })(req, res, next);
    })
    .catch(err => {
      res
        .status(500)
        .json({status: "error", error: err});
    });
};

function logoutUser(req, res, next) {
  req.logout();
  res
    .status(200)
    .send("log out success");
}

function registerGoogleUser(req, res, next) {
  let profileObj = req.body.profileObj;
  let tokenObj = req.body.tokenObj;
  let userEmail = profileObj.email;
  let accessToken = tokenObj.access_token;
  let userName = profileObj.name;
  let googleId = profileObj.googleId

  db
    .none('INSERT INTO google (g_token, g_id, g_email, g_name) VALUES ($1, $2, $3, $4);', [accessToken, googleId, userEmail, userName])
    .then(function (data) {
      res
        .status(200)
        .json({status: "success", data: data, message: "Registered with Google"});
    })
    .catch(function (err) {
      return next(err);
    });
  passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile']})
};

function loginGoogleUser(req, res, next) {
  let profileObj = req.body.profileObj;
  let tokenObj = req.body.tokenObj;
  let userEmail = profileObj.email;
  let accessToken = tokenObj.access_token;
  let userName = profileObj.name;
  let googleId = profileObj.googleId
console.log('AM I HITTING THIS?')
  db
    .one('SELECT * FROM google WHERE g_email = ${userEmail}', {userEmail: userEmail})
    .then(function (data) {
      res
        .status(200)
        .json({status: "success", data: data, message: "Logged in with Google"});
    })
    .catch(function (err) {
      return next(err);
    });
};

function AllQuestionsAndOptions(req, res, next) {
  db
  .any('SELECT * from questions')
  .then(function (data) {
    res.status(200).json({
      status: "success",
      data: data,
      message: "Retrieved ALL questions and options"
    });
  })
  .catch(function (err) {
    return next(err);
  });
};


module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  logoutuser: logoutUser,
  registerGoogleUser: registerGoogleUser,
  loginGoogleUser: loginGoogleUser,
  AllQuestionsAndOptions:AllQuestionsAndOptions
};