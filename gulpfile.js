'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var jade = require('gulp-jade');

//dev task start
//TODO can not compile the sass or less file
gulp.task('sass', function () {
  return gulp.src('./sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true})
      .on('error', sass.logError))
    .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
    .pipe(reload({stream: true}));
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*', 'views/**/*.*'],
    browser: 'google chrome',
    port: 5000
  });
});

gulp.task('nodemon', function (cb) {

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
  return gulp.src(['views/**/*.jade','!views/error.jade'])
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('./public/views'));
});
//build task end


gulp.task('default', ['browser-sync', 'sass'], function () {
  gulp.watch('sass/**/*.*', ['sass']);
});
