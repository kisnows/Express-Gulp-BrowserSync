'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var jade = require('gulp-jade');
var del = require('del');

//dev task start
//TODO can not compile the sass or less file
gulp.task('sass', function () {
  return gulp.src('./sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: 'compressed'
      }).on('error', sass.logError))
    .pipe(prefix('last 2 versions', 'ie 8', 'Android 4.0'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
    .pipe(reload({ stream: true }));
});

gulp.task('browser-sync', ['nodemon'], function () {
  del(['./public/*.html']);
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*', 'views/**/*.*'],
    browser: 'google chrome',
    notify: false,
    port: 5000
  });
});

gulp.task('nodemon', function (cb) {
  del(['./public/*.html']);

  var called = false;

  return nodemon({
    script: 'bin/www'
  }).on('start', function () {
    if (!called) {
      cb();
      called = true;
    }
  });
});
//dev task end

//build task start
//TODO add build task
gulp.task('jade', function () {
  return gulp.src([
    'views/**/*.jade',
    '!views/includes/*.jade',
    '!views/layout/*.jade',
    '!views/error.jade'
  ])
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./public/views'));
});

gulp.task('build', ['jade']);
//build task end

gulp.task('default', ['browser-sync', 'sass'], function () {
  gulp.watch('sass/**/*.*', ['sass']);
});

