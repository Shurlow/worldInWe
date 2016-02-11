var express = require('express');
var router = express.Router();
// var React = require('react')
// var ReactDOMServer = require('react-dom/server')
// var App = React.createFactory(require('../client/App.jsx'))

// var htmlStr = ReactDOMServer.renderToString(App({stories: 'hello'}))

var clientSrc = "";

if (process.env.NODE_ENV == 'prod') {
  var clientSrc = "http://worldinme.xyz/js/main.js"
}
if (process.env.NODE_ENV == 'dev') {
  var clientSrc = "http://localhost:3000/js/main.js"
}


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { reactOutput: 'Loading...', file: clientSrc });	
});

router.get('/*', function(req, res, next) {
	res.render('index', { reactOutput: 'Loading...', file: clientSrc });	
});

module.exports = router;
