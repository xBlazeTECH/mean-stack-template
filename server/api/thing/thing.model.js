const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var ThingSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
});
  ThingSchema.post("save", function () {
    console.log('dbsave');
  });
  ThingSchema.post("remove", function () {
    console.log('dbremove');
  });
module.exports = {
  model: mongoose.model("Thing", ThingSchema)
}