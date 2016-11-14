var express = require('express');
var router = express.Router();
var React = require('react')
// var ReactDOMServer = require('react-dom/server')
// var App = React.createFactory(require('../client/main.jsx'))

// var htmlStr = ReactDOMServer.renderToString(App({stories: 'hello'}))

var clientSrc = "";
var mode = process.env.NODE_ENV

if ( mode === 'production') {
  var clientSrc = "/js/bundle.min.js"
} else if ( mode === 'development') {
  var clientSrc = "/js/bundle.js"
} else {
  throw "No env mode found!"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // var reactHtml = React.renderToString(App({}));
	res.render('index', { reactOutput: 'Loading...', file: clientSrc });	
});

router.get('/*', function(req, res, next) {
	res.render('index', { reactOutput: 'Loading...', file: clientSrc });	
});

module.exports = router;
