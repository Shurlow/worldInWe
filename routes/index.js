var express = require('express');
var router = express.Router();
var React = require('react')
var ReactDOMServer = require('react-dom/server')
// var App = React.createFactory(require('../client/App.jsx'))

// var htmlStr = ReactDOMServer.renderToString(App({stories: 'hello'}))

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { reactOutput: 'Hi' });	
});

router.get('/*', function(req, res, next) {
	res.render('index', { reactOutput: 'Hi W' });	
});

module.exports = router;
