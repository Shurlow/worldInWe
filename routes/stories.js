var express = require('express');
var router = express.Router();
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var db = require('../db.js');

/* GET stories listing. */
router.get('/', function(req, res, next) {
	db.getStories(function(data) {
		res.json(data);
	})
});

router.get('/:story_id', function(req, res, next) {
	var id = req.params.story_id
	db.getStory(id, function(err, data) {

		//TODO: abstract error handling
		if (err) {
			res.status(500);
	    res.json({
	      message: 'Internal server error',
	      error: err
	    });
		} else {
			if (data) return res.json(data);
			//if err & data null
			res.status(404)
	    res.json({
	      message: 'Story not found: ' + id,
	      error: err
	    });
		}
	})
});

module.exports = router;