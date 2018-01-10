var app = require('./dev.bundle.js');

app.requires.push('appE2E');

require('angular-mocks');

require('./app.httpBackend.js');

// Mock Services
require('./services/mock.js');