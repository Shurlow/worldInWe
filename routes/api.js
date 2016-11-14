var express = require('express');
var router = express.Router();
var db = require('../db.js');
var jwt = require('jsonwebtoken')

router.get('/', function(req, res, next) {
	db.getStories(function(err, data) {
		if (err) {
			// console.error(err)
			res.status(500).send('Error adding story object')
		} else {
			res.status(200).json({stories: data})
		}
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

router.get('/responses/:story_id', function(req, res, next) {
	db.getResponses(req.params.story_id, function(err, data) {
		if (err) {
			res.status(500).send('Error getting responses for story')
		} else {
			// console.log(data)
			res.json(data)
		}
	})
})

router.post('/responses/:story_id', function(req, res) {
	console.log('posting response', req.body)
	db.postResponse(req.params.story_id, req.body, function(err, data) {
		if (err) {
			res.status(500).send('Error posting response for story.')
		} else {
			res.status(200).send('Response submitted.')
		}
	})
})

router.delete('/responses/delete/:response_id', function(req, res) {
	var response_id = req.params.response_id
	var decoded = jwt.verify(req.body.token, 'supersecret!')
	db.deleteResponse(response_id, decoded.id, function(err, data) {
		if (err) {
			res.status(500).send('Error deleting response for story.')
		} else {
			res.status(200).send('Response deleted.')
		}
	})
})

// Post new story
// req.body = { id, title, content, author... }
router.post('/story', function(req, res) {
	console.log(req.body)
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
	var id = req.params.id
	var buf = new Buffer(req.body.img.replace(/^data:image\/\w+;base64,/, ""),'base64')
  processImage(buf, id, function(err, response) {
    if (err) {
      console.error(err)
      res.status(500).send("There was an error uploading your image.")
    } else {
    	console.log(response)

			var imgstring = `https://s3.amazonaws.com/wiw-full/${id}.jpg?${new Date().getTime()}`
			res.status(200).json({ url: imgstring })
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
			res.status(200).send('update successfull')
		}
	})
});

//Update indevidual story
router.delete('/:story_id', function(req, res) {
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

router.get('/topic/active', function(req, res) {
	db.getActiveTopic(function(err, data) {
		if (err) {
			res.status(500).send('Error getting active topic')
		} else {
			res.status(200).json(data)
		}
	})
})


module.exports = router;