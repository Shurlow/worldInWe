var express = require('express');
var router = express.Router();

/* GET /auth */
router.get('/', function(req, res, next) {
  res.render('index', { reactOutput: 'Loading...', file: clientSrc });  
});

module.exports = router;
