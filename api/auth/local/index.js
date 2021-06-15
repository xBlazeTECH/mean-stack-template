
const express = require('express');
const passport = require('passport');
const auth = require('../auth.service');

const router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, { message: 'User not found, please try again.' });

    const token = auth.signToken(user._id, user.role);
    res.json({ token: token });
  })(req, res, next)
});

module.exports = router;