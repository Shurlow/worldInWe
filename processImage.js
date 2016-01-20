var fs = require('fs')
var gm = require('gm').subClass({imageMagick: true});

module.exports = function(imageBuffer, id, callback) {
  console.log('Processing image...')

  // gm(imageBuffer)
  //   .toBuffer(function(err, buffer) {
  //     console.log('time to upload')
  //     if (err) return callback(err)
  //     uploadImage(buffer, id, function(error, response) {
  //       if (error) return callback(error)
  //       callback(null, "S3:" + response)
  //     })
  //   })


  uploadImage(imageBuffer, id, 'world-in-me', function(err, res) {
    if (err) return callback(err)
    callback(null, "S3:" + res)
  })

  cropThumb(imageBuffer, id)


  // blur preview
  // gm(imageBuffer)
  //   .resize(20, 20)
  //   .quality(70)
  //   .noise('laplacian')
  //   .toBuffer(function (err, buffer) {
  //     if (err) return console.log(err);
  //     uploadImage("preview", buffer)
  //   })

}

function cropThumb(imageBuffer, id) {
  var w, h;

  gm(imageBuffer)
    .size(function(err, value) {
      w = value.width
      h = value.height
    })
    .gravity('Center')
    .crop(400, 400)
    .extent(400,400)
    .toBuffer(function(err, buffer){
      uploadImage(buffer, id, 'world-in-me-thumbs', function(err, res){
        if (err) console.error(err)
      })
    })
    // .write('TESTIMG.jpg', function(err) {
    //   console.log(err)
    // })
    // .toBuffer(function(err, buffer) {
    //   console.log('cropping..')
    //   // if ( w >= 450) {
    // //crop for storyboard
    // // gm(imageBuffer)
    // //   .gravity('center')
    // //   .crop(450)

    // })
      //   .write('TESTIMG.jpg', function(err) {
      //   console.log(err)
      // })
}

var aws = require('aws-sdk');
aws.config.loadFromPath('./aws_config.json');
var s3 = new aws.S3();
 
function uploadImage(buf, id, bucket, cb) {
    s3.putObject({
      ACL: "public-read",
      Bucket: bucket,
      Key: id + '.jpg',
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpg',
    }, cb)
}