'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');

//dev task start
gulp.task('sass', function () {
  return gulp.src('public/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed', sourceComments: 'map'}, {errLogToConsole: true}))
    .pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
    .pipe(gulp.dest('public/css'))
    .pipe(reload({stream: true}));
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["public/**/*.*", "views/**/*.*"],
    browser: "google chrome",
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
//build task end
gulp.task('default', ['browser-sync'], function () {
});
