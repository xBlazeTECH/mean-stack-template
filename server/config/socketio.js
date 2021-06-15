const config = require('./environment');

function onDisconnect(socket) {

}

function onConnect(socket) {
  socket.on('info', function (data) {
    console.info(`[${socket.address}] ${JSON.stringify(data, null, 2)}`);
  });

  require('../api/thing/thing.socket').register(socket);
}

module.exports = function(socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"
  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

    socketio.on("connection", function (socket) {
      socket.address =
        socket.handshake.address !== null
          ? socket.handshake.address.address +
            ":" +
            socket.handshake.address.port
          : process.env.DOMAIN;

      socket.connectedAt = new Date();

      // Call onDisconnect.
      socket.on("disconnect", function () {
        onDisconnect(socket);
        console.info(`[${socket.address}] DISCONNECTED`);
      });

      // Call onConnect.
      onConnect(socket);
      console.info(`[${socket.address}] CONNECTED`);
    });
}