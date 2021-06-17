const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

module.exports.create = function (myEmitter) {
  var ThingSchema = new Schema({
    name: String,
    info: String,
    active: Boolean,
  });
  ThingSchema.post("save", function (doc) {
    myEmitter.emit("save", doc);
  });
  ThingSchema.post("remove", function (doc) {
    myEmitter.emit("remove", doc);
  });
  return mongoose.model("Thing", ThingSchema);
};

module.exports.get = function () {
  return mongoose.model("Thing");
};
