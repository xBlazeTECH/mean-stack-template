process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/environment');
const User = require('./api/user/user.model');

mongoose.connect(config.mongo.uri, config.mongo.options);

if (config.seedDB) { require('./config/seed'); }

const app = express();
const server = require('http').createServer(app);
const socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function() {
  console.log(`Express server listening on ${config.port}, in ${app.get('env')} mode.`);
});

exports = module.exports = app;