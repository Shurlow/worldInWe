var express = require('express');
// var passport = require('passport');
var router = express.Router();

/* GET /auth */
router.get('/', function(req, res, next) {
  res.render('index', { reactOutput: 'Loading...', file: clientSrc });  
});

// router.get('facebook/callback', passport.authenticate('facebook'))

module.exports = router;
