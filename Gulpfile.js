var source = require('vinyl-source-stream');
var gulp = require('gulp');
var compass = require('gulp-compass');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var babelify = require("babelify");
var notify = require("gulp-notify");
var uglify = require("gulp-uglify");
var streamify = require("gulp-streamify");

var scriptsDir = './client';
var buildDir = './public/js';


function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}


// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file, watch) {
  var props = {
    entries: [scriptsDir + '/' + file],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true, // req for watchify
    transform: [babelify, reactify]
  };
  var bundler = watch ? watchify(browserify(props)) : browserify(props);
  // bundler.transform([ reactify, babelify ]);
  function rebundle() {
    var stream = bundler.bundle();
    return stream.on('error', handleErrors)
    .pipe(source(file))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest(buildDir + '/'));
  }
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });
  return rebundle();
}

function styles() {
  var opt = {
    config_file: './styles/config.rb',
    css: './public/css',
    sass: 'styles/sass'
  }
  var preprocess = function() {
    gutil.log('Compiling Sass');
    return gulp.src('styles/*.scss')
      .pipe(compass(opt).on('error', handleErrors))
      .pipe(gulp.dest('public/css/'))
      // .pipe(notify({
      //   message: "CSS Compiling Done.",
      // }))
  }
  return preprocess()
}


gulp.task('build', function() {
  return buildScript('main.js', false);
});

gulp.task('styles', function() {
  styles()
  return gulp.watch('styles/sass/*.scss', styles);
});

gulp.task('default', ['build', 'styles'], function() {
  return buildScript('main.js', true);
});

// https://gist.github.com/Sigmus/9253068