var fs = require('fs')
var gm = require('gm').subClass({imageMagick: true});

module.exports = function(imageBuffer, id, callback) {

  // gm(imageBuffer)
  //   .toBuffer(function(err, buffer) {
  //     console.log('time to upload')
  //     if (err) return callback(err)
  //     uploadImage(buffer, id, function(error, response) {
  //       if (error) return callback(error)
  //       callback(null, "S3:" + response)
  //     })
  //   })

  // cropThumb(imageBuffer, id)
  uploadImage(imageBuffer, id, 'wiw-full', function(err, res) {
    if (err) return callback(err, null)
    return callback(null, res)
  })
  // cropBlur(imageBuffer, id)
}

function cropBlur(imageBuffer, id) {
  console.log('making blur')
  gm(imageBuffer)
  .resize(20, 20)
  .quality(70)
  .noise('laplacian')
  .toBuffer(function (err, buffer) {
    if (err) return console.log(err);
    uploadImage(buffer, id, 'worldinme-previews', function(error, res){
      if (err) console.error(error)
    })
  })
}

function cropThumb(imageBuffer, id) {
  var w, h;

  gm(imageBuffer)
    .size(function(err, value) {
      if (err) {console.error(err)}
      w = value.width
      h = value.height
    })
    .gravity('Center')
    .crop(650, 450)
    .extent(650, 450)
    .toBuffer(function(err, buffer){
      if (err) console.error(err)
      uploadImage(buffer, id, 'worldinme-thumbs', function(error, res){
        if (err) console.error(error)
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