var r = require('rethinkdb');
var connection = null;

exports.postStory = function(story, cb) {
  withConnection(function(conn) {
    console.log('post story to db', story)
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
        cb(array)
      }).error(function(err) {
        console.log('Error getting stories:', err)
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


exports.createUser = function(userObj, cb) {
  withConnection(function(conn) {
    r.table('user')
      .insert(userObj)
      .run(conn, cb)
  })
}

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
