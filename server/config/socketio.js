const config = require('./environment');

function onDisconnect(socket) {

}

function onConnect(socket, myEmitter) {
  // Send a message to connected clients.
  socket.emit('connected', {});
  socket.on('info', function (data) {
    console.info(`[${socket.handshake.address}] ${JSON.stringify(data, null, 2)}`);
  });

  socket.on('ping', function (data) {
    socket.emit('pong', socket.connectedAt);
  });

  require('../api/thing/thing.socket').register(socket, myEmitter);
}

module.exports = function(socketio, myEmitter) {
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
      //console.log(socket);
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
        console.info(`[${socket.handshake.address}] DISCONNECTED`);
      });

      // Call onConnect.
      onConnect(socket, myEmitter);
      console.info(`[${socket.handshake.address}] CONNECTED`);
    });
}