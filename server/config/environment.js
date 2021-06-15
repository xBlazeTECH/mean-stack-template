const path = require('path');

const all = {
  env: process.env.NODE_ENV,

  root: path.normalize(__dirname, '/../../..'),

  port: process.env.PORT || 9000,

  seedDB: true,

  secrets: {
    session: 'app-session-secret'
  },

  userRoles: ['guest', 'user', 'admin'],

  mongo: {
    uri: 'mongodb://localhost/mean-stack-dev',
    options: {
      useMongoClient: true
    }
  }
}

module.exports = all;