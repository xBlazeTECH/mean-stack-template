const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const modelName = "Thing";

module.exports.create = function (myEmitter) {
  var ModelSchema = new Schema({
    name: String,
    info: String,
    active: Boolean,
  });
  ModelSchema.post("save", function (doc) {
    myEmitter.emit(`${modelName.toLowerCase()}:save`, doc);
  });
  ModelSchema.post("remove", function (doc) {
    myEmitter.emit(`${modelName.toLowerCase()}:remove`, doc);
  });
  return mongoose.model(modelName, ModelSchema);
};

module.exports.getModel = function () {
  return mongoose.model(modelName);
};
