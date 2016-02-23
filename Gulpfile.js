var source = require('vinyl-source-stream');
var gulp = require('gulp');
var compass = require('gulp-compass');
var lrload = require('livereactload');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var babelify = require("babelify");
var notify = require("gulp-notify");
var uglify = require("gulp-uglify");
var streamify = require("gulp-streamify");
var duration = require('gulp-duration')
var exorcist = require('exorcist');

var scriptsDir = './client';
var buildDir = './public/js';

const production = process.env.NODE_ENV === 'production';
const config = require('./package.json').build
const browserifyProps = {
  entries: [config.scripts.source],
  extensions: config.scripts.extensions,
  debug: true,
  cache: {}, packageCache: {}, fullPaths: true, // req for watchify
  transform: [babelify, reactify]
};

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}


// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
gulp.task('build', function() {
  // var bundler = watch ? watchify(browserify(browserifyProps)) : browserify(browserifyProps);
  var pipeline = browserify(browserifyProps)
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.scripts.filename))

  if(production) {
    pipeline = pipeline
      .pipe(streamify(uglify()))
  } else {
  }
  return pipeline.pipe(gulp.dest(config.scripts.destination))
})

  // function rebundle() {
  //   var stream = bundler.bundle();
  //   return stream.on('error', handleErrors)
  //   .pipe(source(config.scripts.filename))
  //   // .pipe(streamify(uglify()))
  //   .pipe(gulp.dest(buildDir + '/'));
  // }
  // bundler.on('update', function() {
  //   rebundle();
  //   gutil.log('Rebundle...');
  // });
  // return rebundle();

function styles() {
  var opt = {
    config_file: './styles/config.rb',
    css: './public/css',
    sass: 'styles/sass'
  }
  var preprocess = function() {
    gutil.log('Compiling Sass');
    return gulp.src('styles/sass/main.scss')
      .pipe(compass(opt).on('error', handleErrors))
      .pipe(gulp.dest('public/css/'))
      // .pipe(notify({
      //   message: "CSS Compiling Done.",
      // }))
  }
  return preprocess()
}

gulp.task('styles', function() {
  styles()
  return gulp.watch('styles/sass/*.scss', styles);
});

gulp.task('watch', () => {

  const bundle = watchify(browserify(browserifyProps).plugin(lrload));

  bundle.on('update', () => {
    const build = bundle.bundle()
      .on('error', handleErrors)
      .pipe(source(config.scripts.filename));

    build
    .pipe(gulp.dest(config.scripts.destination))
    .pipe(duration('Rebundling browserify bundle'));
  }).emit('update');
});

gulp.task('default', ['styles', 'build', 'watch']);

// https://gist.github.com/Sigmus/9253068