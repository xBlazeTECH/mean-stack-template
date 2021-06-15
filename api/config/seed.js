/**
 * Populate DB with sample data on server start
 */
var mongoose = require("mongoose");
var User = mongoose.model("User");

User.find({}).remove(function() {
  User.create(
    {
      provider: "local",
      name: "Test User",
      email: "test@test.com",
      hash: "9a7c18b4bd19e975e8ce1e44fd8be53072783e51209d84658c2f061cfd4164e6f0887427a6352581321c7f799b1b1d58c079cb4014a640cf0f1c915d338bdd21",
      salt: "c6c9d89ffc9102c0bcaa18ac53e980d2",
    },
    {
      provider: "local",
      role: "admin",
      name: "Admin User",
      email: "admin@admin.com",
      hash: "8be214203a31f4e6d17d56f622a371a1b878d4acb08b77d679cce4ca94e3951fec788062be32524823d0e1da73f0d27b7d7ac1ae4fa442faacc3dc998dbb7912",
      salt: "c6c9d89ffc9102c0bcaa18ac53e980d2",
    }
  );
});