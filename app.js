var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
// var passport = require('passport')

//Eneble JSX transpiling for server side react
// require("node-jsx").install();
require('babel-core/register')

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// app.use(favicon(path.join(__dirname, 'public', 'res', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
// app.use(bodyParser.raw({limit: '5mb'}));
// app.use(bodyParser.urlencoded({ limit: '5mb' }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api', require('./routes/api.js'));
app.use('/auth', require('./routes/auth.js'));
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log('Dev err handler says:', err)
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log('Production err handler says:', err)
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
