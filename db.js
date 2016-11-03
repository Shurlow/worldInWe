var r = require('rethinkdb');
var exports = module.exports = {};

exports.postStory = function(story, cb) {
  withConnection(function(conn) {
    r.table('story')
      .insert(story)
      .run(conn, function(err, res) {
        if (err) {
          cb(err, null)
        }
        else if (res.errors) {
          cb(res.errors, null)
        } else {
          cb(null, res)
        }
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

exports.getResponses = function(story_id, cb) {
  withConnection(function(conn) {
    r.table('response')
      .getAll(story_id, {index: 'story_id'})
      .orderBy('date')
      .run(conn)
      .then(function(cursor) {
        return cursor.toArray()
      }).then(function(array) {
        cb(null, array)
      }).error(function(err) {
        console.log('Error getting responses:', err)
        cb(err, null)
      })
  })
}

exports.postResponse = function(story_id, response, cb) {
  response.date = r.now()
  withConnection(function(conn) {
    r.table('response')
      .insert(response)
      .run(conn, function(err, res) {
        if (err) { cb(err, null) }
        else if (res.error) {
          cb(res.error, null)
        } else {
          cb(null, res)
        }
      })
  })
}

exports.deleteResponse = function(response_id, user_id, cb) {
  const response = r.table('response').get(response_id)
  withConnection(function(conn) {
    r.branch(
      response('author_id').eq(user_id),
      response.delete(),
      r.error('Username does not match response')
    ).run(conn, cb)
  })
}

exports.getStories = function(cb) {
  withConnection(function(conn) {
    r.table('story').run(conn)
      .then(function(cursor) {
        return cursor.toArray()
      }).then(function(array) {
        cb(null, array)
      }).error(function(err) {
        console.log('Error getting stories:', err)
        cb(err, null)
      })
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

exports.createUser = function(userObj, cb) {
  withConnection(function(conn) {
    r.branch(
      r.table("user").getAll(userObj.email, {index: "email"}).isEmpty(),
      r.table("user").insert(userObj),
      { error: 'Email is already taken.' }
    ).run(conn, function(err, res) {
      if (err || res.error) {
        cb(res.error, null)
      } else {
        cb(null, true)
      }
    })
  })
}

exports.getUser = function(username, cb) {
  withConnection(function(conn) {
    r.table('user')
      .getAll(username, {index: "username"})
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

exports.createTopic = function(topicObj, cb) {
  withConnection(function(conn) {
    r.table('topic')
      .insert(topicObj, {conflict: "replace"})
      .run(conn, cb)
  })
}

exports.getActiveTopic = function(cb) {
  withConnection(function(conn) {
    r.table('topic')
      .getAll(true, {index: 'active'})
      .run(conn)
      .then(function(cursor) {
        return cursor.toArray()
      }).then(function(array) {
        cb(null, array[0])
      }).error(function(err) {
        console.log('Error getting responses:', err)
        cb(err, null)
      })
  })
}

exports.disconnect = function() {
  return connection.close()
}

//Handles generic db response
// exports.handleError = function(error, cursor) {
//   if (error) {
//     console.error('DB ERROR:', error)
//     // throw error
//   } else {
//     // console.log('database done')
//   }
// }


exports.closeConnection = function() {
  console.log('Closing db connection...')
  connection.close()
}

var connection = null;
function withConnection(cb) {
  if(!connection){
    console.log('Establishing db connection...')
    r.connect( {host: 'localhost', port: 28015, db: 'WorldInWe'}, function(err, conn) {
      if (err) console.error(err)
      else {
        connection = conn
        cb(conn)
      }
    })
  } else cb(connection)
}

exports.exportConnection = withConnection;