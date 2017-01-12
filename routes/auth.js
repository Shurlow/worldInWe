var express = require('express');
var router = express.Router();
var db = require('../db')
var jwt = require('jsonwebtoken')

router.post('/login', function(req, res) {
  console.log('Login Attempt for', req.body.username)
  //TODO: clean up db request handling
  db.getUser(req.body.username, function(err, user) {
    if (user) {
      console.log(user)
      if (user.password === req.body.password) {
        var token = jwt.sign({ username: user.username, id: user.id }, 'supersecret!')
        res.status(200).json({'token': token})
      } else {
        res.status(403).send('Bad Authentication.')
      }
    } else {
      return res.status(404).send('User not found.')
    }
  })
});

router.post('/create', function(req, res, next) {
  var user = req.body
  if (user.accessCode === 'secret') {
    delete user['accessCode']
    user.privileges = 'admin'
  } else {
    delete user['accessCode']
    user.privileges = 'read_only'
  }
  db.createUser(user, function(err, success) {
    if (success) {
      var token = jwt.sign({ username: user.username, id: user.id, privileges: user.privileges }, 'supersecret!')
      res.status(200).json({'token': token})
    } else {
      return res.status(403).send('Error creating user.')
    }
  })
});

// router.get('/user', expressJWT({secret: 'supersecret!'}), function(req, res, next) {
//   console.log('Getting users...')
//   db.getUsers(function(err, users) {
//     if (err) return res.sendStatus(403).json({message: 'Could not get users.'})
//     else if (users) {
//       console.log('users', users)
//       res.json(users)
//     }
//   })
// });

module.exports = router;
