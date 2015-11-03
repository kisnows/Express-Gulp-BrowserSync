import gulp from 'gulp';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import prefix from 'gulp-autoprefixer';
import nodemon from 'gulp-nodemon';
import sourcemaps from 'gulp-sourcemaps';
import jade from 'gulp-jade';
import del from 'del';

const reload = browserSync.reload;
//dev task start
//DONE can not compile the sass or less file

gulp.task('sass', ()=> {
  return gulp.src(['./sass/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true})
      .on('error', sass.logError))
    .pipe(prefix('last 2 versions', 'ie 8', 'Android 4'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
    .pipe(reload({stream: true}));
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:3002',
    files: ['public/**/*.*', 'views/**/*.*', 'submodule/**/*.*'],
    browser: 'google chrome',
    notify: false,
    port: 5000
  });
});

gulp.task('nodemon', (cb)=> {

  let called = false;

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
//DONE add build task
gulp.task('jade', ()=> {
  return gulp.src([
      'views/**/*.jade',
      '!views/error.jade',
      '!views/components/**/*.jade',
      '!views/includes/**/*.jade',
      '!views/index-parts/*.jade',
      '!views/layout/**/*.jade'
    ])
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./dist'));
});
//build task end

gulp.task('clean', (cb)=> {
  del(['./dist/*'], cb)
});

gulp.task('copy', ()=> {
  return gulp.src([
      'public/css/**/*',
      'public/images/**/*',
      'public/js/**/*'
    ], {base: './public'})
    .pipe(gulp.dest('./dist'))
});

gulp.task('dist', ['clean', 'copy', 'jade']);


gulp.task('default', ['browser-sync', 'sass'], ()=> {
  gulp.watch(['sass/**/*.*'], ['sass']);
});

