var gulp       = require('gulp')
var browserify = require('gulp-browserify');

gulp.task('scripts', function () {

    gulp.src(['client/main.js'])
        .pipe(browserify({
            debug: true,
            transform: [ 'reactify', 'babelify' ]
        }))
        .pipe(gulp.dest('./public'));

});

gulp.task('default', ['scripts']);