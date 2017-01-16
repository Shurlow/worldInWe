var express = require('express');
var router = express.Router();
var db = require('../db.js');
var jwt = require('jsonwebtoken')
// const ev = require('express-validation');
// const validations = require('../validations/story');
router.use(require('./stories.js'))

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
