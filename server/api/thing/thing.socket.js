var model = require("./thing.model").getModel();

exports.register = function (socket, myEmitter) {
  console.log("Registering Thing Socket!");

  myEmitter.on(`${model.modelName.toLowerCase()}:save`, function (doc) {
    console.log(`${model.modelName}:save - ${doc._id}`);
    onSave(socket, doc);
  })

  myEmitter.on(`${model.modelName.toLowerCase()}:remove`, function (doc) {
    console.log(`${model.modelName}:remove - ${doc._id}`);
    onRemove(socket, doc);
  });

  console.log("Registered Thing Socket!");
};

function onSave(socket, doc, cb) {
  socket.emit("thing:save", doc);
}

function onRemove(socket, doc, cb) {
  socket.emit("thing:remove", doc);
}