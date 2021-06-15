var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlThing = require('../thing/thing.controller');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// things
router.get("/things", ctrlThing.index);
router.get("/things/:id", ctrlThing.show);
router.post("/things", ctrlThing.create);
router.put("/things/:id", ctrlThing.update);
router.patch("/things/:id", ctrlThing.update);
router.delete("/things/:id", ctrlThing.destroy);

module.exports = router;
