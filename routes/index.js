var express = require('express');
var router = express.Router();
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var ReactApp = React.createFactory(require('../client/components/StoryBoard'))

var stories = [
	'Big Red Dog',
	'Apple Cider Donuts',
	'Beep boop'
]

// var db = require('../db')
	

/* GET home page. */
router.get('/', function(req, res, next) {
	var htmlStr = ReactDOMServer.renderToString(ReactApp({stories: 'hello'}))
	res.render('index', { reactOutput: htmlStr });	
});

module.exports = router;
