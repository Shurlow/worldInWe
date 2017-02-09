var fs = require('fs')
var gm = require('gm').subClass({imageMagick: true});

module.exports = function(imageBuffer, id, callback) {
  console.log(' - cropping & saving image', imageBuffer)
  //crop full & thumbnail sizes & save to S3
  cropImageSave(imageBuffer, 1920, 1080, id, 'wiw-full', function(err) {
    console.log('Ever done?');
    if (err) {
      return callback(err)
    }
    console.log('Cropping thumb now:');
    cropImageSave(imageBuffer, 200, 200, id, 'wiw-thumb', function(err) {
      if (err) return callback(err)
      callback(null)
    })
  })
}

function cropImageSave(imageBuffer, w, h, id, bucketName, cb) {
  gm(imageBuffer)
    .in('-filter', 'Triangle')
    .in('-define', 'filter:support=2')
    .in('-thumbnail', `${w}x${h}^`)
    .in('-gravity', 'center')
    .in('-extent', `${w}x${h}`)
    .in('-unsharp', '0.25x0.25+8+0.065')
    .in('-dither', 'None')
    .in('-posterize', 136)
    .in('-quality', 82)
    .in('-define', 'jpeg:fancy-upsampling=off')
    .in('-define', 'png:compression-filter=5')
    .in('-define', 'png:compression-level=9')
    .in('-define', 'png:compression-strategy=1')
    .in('-define', 'png:exclude-chunk=all')
    .in('-interlace', 'none')
    .in('-colorspace', 'sRGB')
    .in('-strip')
    .toBuffer(function(err, image){
      console.log('Image processing done', err);
      if (err) return cb(err)
      uploadImage(image, id, bucketName, function(err) {
        if (err) return cb(err)
        cb(null)
      })
    })
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
