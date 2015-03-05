var conf = require('config');

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    plumber     = require('gulp-plumber')
    rename      = require("gulp-rename"),
    rev         = require('gulp-rev'),
    sass        = require('gulp-sass'),
    compass     = require('gulp-compass'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    clean       = require('gulp-clean'),
    minifyCSS   = require('gulp-minify-css'),
    autoprefix  = require('gulp-autoprefixer'),
    htmlmin     = require('gulp-htmlmin'),
    htmlreplace = require('gulp-html-replace'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    es          = require('event-stream'),
    reload      = browserSync.reload;

gulp.task('styles', function() {
  return gulp.src('app/assets/sass/style.sass')
     .pipe(sass({
        errLogToConsole: true,
        sourceComments : 'normal'
    }))
    .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(reload({stream: true}))
    .on('error', handleErrors);
});

gulp.task('scripts', function() {
  return gulp.src('app/assets/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'));
});


gulp.task('images', function() {
  return gulp.src('app/assets/img/**/*')
    .pipe(gulp.dest('dist/assets/img'));
});



/*
  Live browserSync server, taking care of the
  styles and scripts changes automatically
 */
gulp.task('serve', ['styles', 'scripts'], function () {
  /* Start browsersync for socket live reload */
  browserSync({
    server: "./"
  });
 
  /* Watch styles */
  gulp.watch([
    "assets/sass" + '/**/*.scss',
    "assets/sass" + '/**/*.css',
    '!' + "dist/assest/css" + '/style.css'
  ], ['styles']);
 
  /* Watch scripts */
  gulp.watch([
    "assets/js" + '/**/*.js',
    '!' + "dist/assest/js" + '/main.js'
  ], ['scripts', 'styles', reload]);
 
  /* Watch html */
  gulp.watch('/*.html').on('change', reload);
});

/* Clean dist folder */
gulp.task('clean-dist', function () {
  return gulp.src(conf.paths.dist, {read: false})
    .pipe(clean());
});


gulp.task('default', ['clean-dist'], function() {
    gulp.start('styles', 'scripts', 'images');
});

function handleErrors (error) {

    //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}
