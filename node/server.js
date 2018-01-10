var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var logger = require('morgan');
var cors = require('cors')

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve the static client files
app.use(express.static(path.join(__dirname, '../app/public')));

// start the server
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

// Error handling
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
