process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/environment');
const User = require('./api/user/user.model');

const EventEmitter = require('events');
const listener = new EventEmitter();

mongoose.connect(config.mongo.uri, config.mongo.options);

const app = express();
const server = require('http').createServer(app);
const socketio = require('socket.io')(server, {
  serveClient: true,
  //serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io',
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET","POST"]
  }
});

require('./models').register(listener);

if (config.seedDB) {
  require("./config/seed");
}

require('./config/socketio')(socketio, listener);
require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function() {
  console.log(`Express server listening on ${config.port}, in ${app.get('env')} mode.`);
});

exports = module.exports = app;