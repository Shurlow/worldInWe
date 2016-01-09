var fs = require('fs')
var gm = require('gm').subClass({imageMagick: true});

module.exports = function(imageBuffer, id, callback) {
  console.log('Processing image...')
  var w, h;
  gm(imageBuffer)
    .size(function(err, value) {
      console.log("size:", value)
      w = value.width
      h = value.height
    })
    .toBuffer(function(err, buffer){
      console.log('time to uploads')
      if (err) return callback(err)
      uploadImage(buffer, id, function(error, response) {
        if (error) return callback(error)
        console.log(w, h)
        callback(null, response)
      })
    })

  // if ( w >= 300) {
  //   //crop for storyboard
  //   gm
  //     .crop('laplacian')
  //     .write('TESTIMG' + extension, function(err) {
  //       console.log(err)
  //     })
  // }

  //blur preview
  // gm(imageBuffer)
  //   .resize(20, 20)
  //   .quality(70)
  //   .noise('laplacian')
  //   .toBuffer(function (err, buffer) {
  //     if (err) return console.log(err);
  //     uploadImage("preview", buffer)
  //   })

}

var aws = require('aws-sdk');
aws.config.loadFromPath('./aws_config.json');
var s3 = new aws.S3();
 
function uploadImage(buf, id, cb) {
    s3.putObject({
      ACL: "public-read",
      Bucket: "world-in-me",
      Key: id + '.jpg',
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpg'
    }, cb)
  }