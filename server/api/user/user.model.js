var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var crypto = require("crypto");

var UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  pin: String,
  provider: String,
  hash: String,
  salt: String,
});

UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.setPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.virtual('profile')
.get(function() {
  return {
    'name': this.name,
    'role': this.role
  }
})

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    },
    config.secrets.session
  ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model("User", UserSchema);
