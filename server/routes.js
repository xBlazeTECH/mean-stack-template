const errors = require('./components/errors');

module.exports = function(app) {
  app.use('/api/things', require('./api/thing'));

  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
}