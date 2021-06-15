const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

exports.setup = function (User, config) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (err, user, done) {
        User.findOne(
          {
            email: email.toLowerCase(),
          },
          function (err, user) {
            if (err) return done(err);

            if (!user) {
              return done(null, false, {
                message: "This email is not registered.",
              });
            }
            if (!user.authenticate(password)) {
              return done(null, false, {
                message: "This password is not correct.",
              });
            }
            return done(null, user);
          }
        );
      }
    )
  );
};
