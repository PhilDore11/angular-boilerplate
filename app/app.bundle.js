var app = require('./app.js');

require('./app.controller.js');

require('./styles/styles.css')

require('./filters');
require('./directives');
require('./components');
require('./services');
require('./helpers');

module.exports = app;