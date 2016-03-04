var express = require('express');
var router = express.Router();
var db = require('../db.js');

router.get('/', function(req, res, next) {
	db.getStories(function(err, data) {
		if (err) {
			console.error(err)
			res.status(500).send('Error adding story object')
		} else {
			res.json(data);
			// res.send('Story submitted.')
		}
	})
});

// router.get('/featured', function(req, res, next) {
// 	db.getFeatured(function(data) {
// 		res.json(data);
// 	})
// });

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
router.post('/story', function(req, res) {
	console.log('Posting New Story', req.body)
	db.postStory(req.body, function(err, data) {
		console.log('Post:', err, data)
		if (err) {
			res.status(500).send('Error adding story object')
		} else {
			res.status(200).send('Story submitted.')
		}
	})
});


//Image Upload using s3
var processImage = require('../processImage.js')

router.post('/image/:id', function(req, res) {
	var buf = new Buffer(req.body.img.replace(/^data:image\/\w+;base64,/, ""),'base64')
  processImage(buf, req.params.id, function(err, response) {
    if (err) {
      console.log(err)
      res.status(500).send("There was an error uploading your image.")
    } else {
    	console.log('image upload good.', response)
      res.status(200).send(response.ETag)
    }
  })
})

//Update indevidual story
router.post('/update/:story_id', function(req, res) {
	var id = req.params.story_id
	console.log('updating', id, req.body)
	db.updateStory(id, req.body, function(err, data) {
		if (err) {
			res.status(500).send('Error updating story object')
		} else {
			console.log('update successfull', data)
			res.status(200).send('All good')
		}
	})
});

//Update indevidual story
router.post('/delete/:story_id', function(req, res) {
	console.log('deleting')
	var id = req.params.story_id
	db.updateStory(id, req.body, function(err, data) {
		if (err) {
			res.status(500).send('Error deleting story object')
		} else {
			res.status(200).send('Story with id:' + id + ' deleted.')
		}
	})
});




module.exports = router;