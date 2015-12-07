var express = require('express');
var router = express.Router();
var db = require('../db.js');

router.get('/', function(req, res, next) {
	db.getStories(function(data) {
		res.json(data);
	})
});

router.get('/featured', function(req, res, next) {
	db.getFeatured(function(data) {
		res.json(data);
	})
});

router.get('/:story_id', function(req, res) {
	var id = req.params.story_id
	db.getStory(id, function(err, data) {

		//TODO: abstract error handling
		if (err) {
			res.status(500);
	    res.json({
	      message: 'Internal server error',
	      error: err
	    });
		}
		if (data) return res.json(data);
		else {
			res.status(404).json({
	      message: 'Story not found: ' + id,
	      error: err
	    });
		}
	})
});

// Post new story
router.post('/', function(req, res) {
	console.log('Posting New Story')
	db.postStory(req.body, function(err, data) {
		if (err) {
			res.status(500).send('Error adding story object')
		} else {
			res.send('Story submitted.')
		}
	})
});

//Update indevidual story
router.post('/update/:story_id', function(req, res) {
	console.log('updating')
	var id = req.params.story_id
	db.updateStory(id, req.body, function(err, data) {
		if (err) {
			res.status(500).send('Error updating story object')
		} else {
			res.send('All good')
		}
	})
});


router.post('/story', function(req, res) {
	var data = req.body
	console.log(data)	
	db.postStory(data, function(err) {
		if (err) return console.log(err)
	})
});

module.exports = router;