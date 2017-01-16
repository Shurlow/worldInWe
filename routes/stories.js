var express = require('express');
var router = express.Router();
var db = require('../db.js');
var jwt = require('jsonwebtoken')
const ev = require('express-validation');
const validations = require('../validations/story');

router.get('/stories', function(req, res, next) {
	var q = req.query
	db.getStories(q.type, q.tag, function(err, data) {
		if (err) {
      res.status(500).send('Error getting stories')
		} else {
      res.status(200).json(data)
    }
	})
});

router.post('/stories', ev(validations.story), function(req, res) {
	db.postStory(req.body, function(err, data) {
		console.log('Post:', err, data)
		if (err) {
			res.status(500).send('Error adding story object')
		} else {
			res.status(200).send('Story submitted.')
		}
	})
});

router.get('/stories/:story_id', function(req, res) {
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
		if (data) {
			return res.json({stories: data})
		}
		else {
			res.status(404).json({
	      message: 'Story not found: ' + id,
	      error: err
	    });
		}
	})
});

router.patch('/stories/:story_id', function(req, res) {
	var id = req.params.story_id
	console.log('updating', id, req.body)
	db.updateStory(id, req.body, function(err, data) {
		if (err) {
			res.status(500).send('Error updating story object')
		} else {
			res.status(200).send('update successfull')
		}
	})
});

router.delete('/stories/:story_id', function(req, res) {
	console.log('deleting')
	var id = req.params.story_id
	db.deleteStory(id, function(err, data) {
		if (err) {
			res.status(500).send('Error deleting story object')
		} else {
			res.status(200).send('Story with id:' + id + ' deleted.')
		}
	})
});

module.exports = router;
