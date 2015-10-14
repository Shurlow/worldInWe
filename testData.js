var db = require('./db')
var faker = require('faker')

console.log('Creating fake stories')

for (var i = 0; i <= 1; i++) {
	var user = makeUser()
	console.log(user)
	for (var i = 0; i <= 2; i++) {
		var story = makeStory(user)
		db.postStory(story, db.handleError)
		db.createUser(user, db.handleError)
	};
}

function makeUser() {
	var user = {}
	user.id = guid()
	user.name = faker.name.findName()
	return user
}

function makeStory(user) {
	var story = {}
	story.author = user.name
	story.title = faker.name.title()
	story.text = faker.lorem.paragraph()
	story.time = Math.round( 1444000000 + Math.random() * (1000000 - 300000) + 300000 )
	return story
}


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4();
}

console.log('done.')