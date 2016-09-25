var express = require('express');
// var passport = require('passport');
var router = express.Router();
var db = require('../db')
var expressJWT = require('express-jwt');
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

router.post('/createUser', function(req, res, next) {
  var user = req.body
  console.log('Adding new user:', user)
  db.createUser(user, function(err, success) {
    if (success) {
      console.log('success!')
      var token = jwt.sign({ username: user.username, id: user.id }, 'supersecret!')
      res.status(200).json({'token': token})
    } else {
      console.log('Create user error:', err)
      return res.status(403).send('Error creating user.')
    }

    // console.log('From DB:', user, err)
    // if (err) return res.send("Sign Up Error!")
    // else if (user) {
    //   console.log('Good User:', user)
    //   delete user.password
    //   res.json(user)
    // }
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
