let db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");
const passport = require("../auth/local");


router.get("/", loginRequired);
router.post('/signin', passport.authenticate("local", {}), db.loginUser);

router.post("/signup", db.registerUser);
router.get("/signout", loginRequired, db.logoutuser);
router.post("/auth/google/callback/signup", db.registerGoogleUser);
router.post("/auth/google/callback/login", db.loginGoogleUser);

router.get("/questions", db.AllQuestionsAndOptions);

module.exports = router;