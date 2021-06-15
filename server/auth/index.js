var express = require("express");
var passport = require("passport");
var config = require("../config/environment");
var User = require("../api/user/user.model");
var jwt = require("express-jwt");

var auth = jwt({
  secret: config.secrets.session,
  userProperty: "payload",
});

// Passport Configuration
require("./local/passport").setup(User, config);

var router = express.Router();

router.use("/local", require("./local"));

router.get("/profile", auth, require("./profile").profileRead);

module.exports = router;
