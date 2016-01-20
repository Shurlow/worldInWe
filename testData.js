var db = require('./db')
var fs = require('fs')
var faker = require('faker')
var Chance = require('chance');
var chance = new Chance();
var processImage = require('./processImage.js')

console.log('Creating fake stories')

// for (var i = 0; i < 3; i++) {
// 	var user = makeUser()
// 	db.createUser(user, handleError())
// 	console.log(user)
// 	for (var i = 0; i < 2; i++) {
// 		var story = makeStory(user)
// 		db.postStory(story, handleError())
// 	};
// };

for (var i = 0; i < 3; i++) {
	console.log('Making fake stories...')
	// var user = makeUser()
	// db.createUser(user, handleError())

	var story = makeStory()
	// story.video = 'bkhLzHuUYmo'
	db.postStory(story, handleError())
	
};



function makeImage(id) {
  var pickImg = chance.integer({ min: 1, max: 4 })
  var imgUrl = "testimg/" + pickImg + ".jpg"
  fs.readFile(imgUrl, function(err, data) {
    if (err) return console.log(err);
    console.log("Using image", pickImg, data)
    processImage(data, id, function(err, res) {
      if (err) {
        console.log(err)
      } else {
        console.log('image upload good.')
      }
    })
  })
  
}


function makeUser() {
	var user = {}
	user.id = guid()
	user.name = faker.name.findName()
	return user
}

function makeStory() {
	var story = {}
	story.id = guid()
	// story.author_id = user.id
	story.author_name = chance.name()
	// story.title1 = faker.lorem.sentence()
	var randomTitle = chance.sentence({words: chance.integer({min: 5, max: 10})})
	var p1 = chance.sentence({words: chance.integer({min: 25, max: 300})})
	var p2 = chance.sentence({words: chance.integer({min: 25, max: 300})})
	var p3 = chance.sentence({words: chance.integer({min: 25, max: 300})})
	story.text = p1 + "\n" + p2 + "\n" + p3 + "\n";
	story.title = toTitleCase(randomTitle)
	// console.log("Title Case:", )
  makeImage(story.id)

	// story.text = 
	// story.text = faker.lorem.paragraphs() + "\n" + " \n" + faker.lorem.paragraphs() + '\n\n' + faker.lorem.paragraphs()
	// story.time = Math.round( 1444000000 + Math.random() * (1000000 - 300000) + 300000 )
	// story.img = 'http://lorempixel.com/800/500/people/' +  Math.round( Math.random() * (10 - 1) + 1 )
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

function toTitleCase(input) {
  var i, j, str, lowers, uppers;
  str = input.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless 
  // they are the first or last words in the string
  lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
  'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
      function(txt) {
        return txt.toLowerCase();
      });

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ['Id', 'Tv'];
  for (i = 0, j = uppers.length; i < j; i++)
    str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
      uppers[i].toUpperCase());

  return str;
}

console.log('done.')