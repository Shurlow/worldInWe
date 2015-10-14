var express = require('express');
var router = express.Router();
var db = require('../db.js');

/* GET stories listing. */
router.get('/', function(req, res, next) {
	db.getStories(function(data) {
		res.json(data);
	})
});

module.exports = router;