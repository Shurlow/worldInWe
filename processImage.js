var fs = require('fs')
var gm = require('gm').subClass({imageMagick: true});

module.exports = function(imageBuffer, id, extension) {
  var w, h;
  gm(imageBuffer)
    .size(function(err, value) {
      console.log("size:", value)
      w = value.width
      h = value.height
    })

  if ( w >= 300) {
    //crop for storyboard
    gm
      .crop('laplacian')
      .write('TESTIMG' + extension, function(err) {
        console.log(err)
      })
  }

  //blur preview
  gm(imageBuffer)
    .resize(20, 20)
    .quality(70)
    .noise('laplacian')
    .toBuffer(function (err, buffer) {
      if (err) return console.log(err);
      uploadImage("preview", buffer)
    })

  function uploadImage(buf) {
    s3.putObject({
      ACL: 'public-read',
      Bucket: "world-in-me",
      Key: id + req.body.extension,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: req.accepts()[0]
    }, function(error, response) {
      console.log('s3 response:', error, response)
      
        }
    })
  }
}

