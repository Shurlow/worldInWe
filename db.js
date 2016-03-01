var r = require('rethinkdb');
var connection = null;

var exports = module.exports = {};

exports.postStory = function(story, cb) {
  withConnection(function(conn) {
    r.table('story')
      .insert(story)
      .run(conn, cb)
  })
}

exports.getStories = function(cb) {
  withConnection(function(conn) {
    r.table('story')
      .run(conn).then(function(cursor) {
        return cursor.toArray()
      }).then(function(array) {
        cb(null, array)
      }).error(function(err) {
        console.log('Error getting stories:', err)
        // cb(err, null)
      })
  })
}

exports.getFeatured = function(cb) {
  withConnection(function(conn) {
    r.table('story')
      .hasFields('video')
      .run(conn).then(function(cursor) {
        return cursor.toArray()
      }).then(function(array) {
        cb(array)
      }).error(function(err) {
        console.log('Error getting stories:', err)
        cb(null)
      })
  })
}

exports.getStory = function(id, cb) {
  withConnection(function(conn) {
    r.table('story').get(id)
      .run(conn, cb)
  })
}

exports.updateStory = function(id, obj, cb) {
  withConnection(function(conn) {
    r.table('story')
      .get(id)
      .update(obj)
      .run(conn, cb)
  })
}

exports.deleteStory = function(id, cb) {
  withConnection(function(conn) {
    r.table('story')
      .get(id)
      .delete()
      .run(conn, cb)
  })
}

exports.getUsers = function(cb) {
  withConnection(function(conn) {
    r.table('user')
      .run(conn).then(function(cursor) {
        return cursor.toArray()
      }).then(function(array) {
        cb(null, array)
      }).error(function(err) {
        console.log('Error getting users:', err)
      })
  })
}

//quick search to if email is free. => { true, false } 
function isEmailAvailible(email, cb) {
  withConnection(function(conn) {
    r.table('user')
      .getAll(email, {index: "email"})
      .run(conn, function(err, cursor) {
        if (err) cb(false)
        else {
          cursor.toArray().then(function(data) {
            if (data.length < 1) cb(true)
            else {
              console.log('email IS used')
              cb(false)
            }
          }).error(console.log)
        }
      })
  })
    
    // if (err) {
    //   console.log('email is used error', err)
    //   cb(true)
    // } else {
    //   if (array.length < 1) {
    //     console.log('IS EMAIL')
    //     cb(true)
    //   } else {
    //     console.log('NO EMAIL')
    //     cb(false)
    //   }
    // }
}

exports.createUser = function(userObj, cb) {
  //check if email is taken
  isEmailAvailible(userObj.email, function(isAvailible) {
    if (isAvailible) {
      withConnection(function(conn) {
        r.table('user')
          .insert(userObj, {returnChanges: true})
          .run(conn, function(err, res) {
            if (err) return cb(err, false)
            else {
              cb(null, true)
            }
          })
      })
    } else {
      cb('Email is already being used', null)
    }
  })
}

    



exports.getUser = function(email, cb) {
  withConnection(function(conn) {
    r.table('user')
      .getAll(email, {index: "email"})
      .run(conn, function(err, cursor) {
        if (err) return cb(err, null)
        else {
          cursor.toArray().then(function(data) {
            cb(null, data[0])
          }).error(console.log)
        }
      })
  })
}



// exports.validateUser = function(email, password, cb) {
//   withConnection(function(conn) {
//     r.table('user')
//       .getAll(email, {index: "email"})
//       .run(conn, function(err, res) {
//         if (err) return cb(err, null)
//         else {
//           console.log(res, password)
//           cb(null, true)
//         }
//       })
//   })
// }


//Handles generic db response
exports.handleError = function(error, cursor) {
  if (error) {
    console.log('DB ERROR:', error)
  } else {
    console.log('story posted successfully.')
  }
}

//Handles data expected db response
// function handleData(error, cursor) {
//   if (error) {
//     console.log('DATA ERROR:', error)
//   } else {
//     cursor.toArray(function(err, data) {
//       if (err) {
//         console.log('bad data')
//       } else {
//         console.log(data)
//       }
//     })
//   }
// }

function withConnection(cb){
  if(!connection){
    console.log('  -- connecting... --')
    r.connect( {host: 'localhost', port: 28015, db: 'WorldInMe'}, function(err, conn) {
      if (err) {
        console.log(err)
      }
      else {
        console.log('  -- done. --')
        connection = conn
        cb(connection)
      }
    })
  } else {
    cb(connection)
  }
}
