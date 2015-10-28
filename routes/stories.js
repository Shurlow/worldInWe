var express = require('express');
var router = express.Router();
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var db = require('../db.js');

/* GET all stories. */
router.get('/', function(req, res, next) {
	db.getStories(function(data) {
		res.json(data);
	})
});

// router.get('/w/*', function(req, res, next) {
// 	db.getStories(function(data) {
// 		res.json(data);
// 	})
// });



module.exports = router;