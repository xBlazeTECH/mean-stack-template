

module.exports.register = function(listener) {
  require("./api/thing/thing.model").create(listener);
}