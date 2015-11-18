var db = require('./db')
var faker = require('faker')

console.log('Creating fake stories')

for (var i = 0; i < 3; i++) {
	var user = makeUser()
	db.createUser(user, handleError())
	console.log(user)
	for (var i = 0; i < 2; i++) {
		var story = makeStory(user)
		db.postStory(story, handleError())
	};
};

for (var i = 0; i < 2; i++) {
	console.log('* making featured story')
	var user = makeUser()
	db.createUser(user, handleError())

	var story = makeStory(user)
	story.video = 'bkhLzHuUYmo'
	db.postStory(story, handleError())
	
};

function makeUser() {
	var user = {}
	user.id = guid()
	user.name = faker.name.findName()
	return user
}

function makeStory(user) {
	var story = {}
	story.id = guid()
	story.author_id = user.id
	story.author_name = user.name
	story.title = faker.lorem.sentence()
	story.text = faker.lorem.paragraphs() + "\n" + " \n" + faker.lorem.paragraphs() + '\n\n' + faker.lorem.paragraphs()
	story.time = Math.round( 1444000000 + Math.random() * (1000000 - 300000) + 300000 )
	story.img = 'http://lorempixel.com/800/500/people/' +  Math.round( Math.random() * (10 - 1) + 1 )
	return story
}

//Handles generic db response
function handleError(error, cursor) {
  if (error) {
    console.log('DB ERROR:', error)
  } else {
    console.log('story posted successfully.')
  }
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