var thing = require("./thing.model");

exports.register = function (app) {
  console.log("Registering Thing Socket!");

  // thing.schema.post("save", function (doc) {
  //   console.log("Saved Thing");
  //   onSave(socket, doc);
  // });
  // thing.schema.post("remove", function (doc) {
  //   console.log("Removed Thing");
  //   onRemove(socket, doc);
  // });
  console.log("Registered Thing Socket!");
};

function onSave(socket, doc, cb) {
  socket.emit("thing:save", doc);
}

function onRemove(socket, doc, cb) {
  socket.emit("thing:remove", doc);
}

function doStuff() {
  console.log('stuff was done');
}