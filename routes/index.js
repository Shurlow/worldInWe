var express = require('express');
var router = express.Router();
// var React = require('react')
// var ReactDOMServer = require('react-dom/server')
// var App = React.createFactory(require('../client/App.jsx'))

// var htmlStr = ReactDOMServer.renderToString(App({stories: 'hello'}))

var clientSrc = "";
var mode = process.env.NODE_ENV

if ( mode === 'production') {
  var clientSrc = "http://worldinme.xyz/js/bundle.min.js"
} else if ( mode === 'development') {
  var clientSrc = "http://localhost:3000/js/bundle.js"
} else {
  throw "No env mode found!"
}


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { reactOutput: 'Loading...', file: clientSrc });	
});

router.get('/*', function(req, res, next) {
	res.render('index', { reactOutput: 'Loading...', file: clientSrc });	
});

module.exports = router;
