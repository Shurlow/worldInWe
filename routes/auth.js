var express = require('express');
// var passport = require('passport');
var router = express.Router();
var db = require('../db')
var jwt = require('express-jwt');

/* GET /auth */
router.post('/getToken', function(req, res, next) {
  console.log('Login Attempt from', req.body.email)
  db.getUser(req.body.email, req.body.password, function(err, user) {
    if (err) return res.sendStatus(403)
    else if (user) {
      res.json({token: '1234TOKEN'})
    }
  })
});

router.post('/newUser', function(req, res, next) {
  console.log('Adding new user:', req.body.email)
  db.createUser(req.body.email, req.body.password, function(err, user) {
    console.log('get user', user)
    if (err) return res.send("Sign Up Error!")
    else if (user) {
      res.json(user.changes[0].new_val)
    }
  })
});

// var fs = require('fs')
// var pubKey = fs.readFileSync('/Users/scotthurlow/.ssh/id_rsa.pub')
// router.post('/protected', jwt({secret: pubKey}), function(req, res) {
//   if (!req.user.admin) return res.sendStatus(401);
//   res.sendStatus(200);
// });

// router.get('facebook/callback', passport.authenticate('facebook'))

module.exports = router;
