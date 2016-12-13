var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    sass = require ('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

// Styles
gulp.task('styles', function() {
  return gulp.src('app/stylesheets/*.scss')
    .pipe(sass.sync({
      outputStyle: 'compressed',
      include: [
        './node_modules/normalize.css'
      ]
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions', 'ie 10'))
    .pipe(minifyCss())
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(browserSync.stream())
});

// Site Scripts
gulp.task('scripts', function(done) {
  return gulp.src(['app/javascript/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(uglify().on('error', function(error){
      done(error);
    }))
    .pipe(gulp.dest('public/javascript'))
});

// Script watch
gulp.task('script-watch', ['scripts'], function(done) {
  browserSync.reload();
  done();
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    port: 7000
  });
});

gulp.task('nodemon', function(cb) {
  var started = false;
  return nodemon({
    script: 'app.js',
    ignore: [
      'app/',
      'public/'
    ]
  }).on('start', function() {
    // to avoid nodemon being started multiple times
    if (!started) {
      started = true;
      cb();
    }
  });
});

gulp.task('watch', ['styles', 'scripts'], function() {
  gulp.watch("app/stylesheets/**/*.scss", ['styles']);
  gulp.watch("app/javascript/**/*.js", ['script-watch']);
  gulp.watch("views/**/*.pug", browserSync.reload);
});

// Default task
gulp.task('default', ['watch', 'browser-sync']);
gulp.task('dist', ['styles', 'scripts']);
