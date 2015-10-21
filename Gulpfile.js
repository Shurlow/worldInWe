var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var source = require('vinyl-source-stream'); 
// var concat = require('gulp-concat');
 
function build() {
  var bundler = browserify({
    entries: './client/main.js',
    transform: [reactify],
    cache: {}, packageCache: {}, fullPaths: true // req for watchify
  })

  var watcher = watchify(bundler)
  watcher
    .on('update', function () {
      console.log('Updating bundle...');
      watcher.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/js'));
        console.log('done.');
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/js'));
    console.log('* watching for changes *')

  return watcher;
};

gulp.task('default', build);