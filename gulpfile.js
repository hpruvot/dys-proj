/* Custom configuration files */
var conf = require('./gulp/conf');

/* Gulp plugins */
var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
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

/* Concatenates vendor & custom styles + sass compilation */
gulp.task('styles', function () {
  var vendors = conf.styles.lib.files.map(function(fileName) { return conf.styles.lib.prefix + fileName; }),
      custom = conf.styles.custom.files.map(function(fileName) { return conf.styles.custom.prefix + fileName; }),
      cssFiles = gulp.src(vendors.concat(custom)),
      sassFiles = gulp.src(conf.paths.sass + '/*.scss');

  if (!!conf.compassConf.usesCompass) {
    /* If we use the compass framework */
    sassFiles = sassFiles.pipe(compass({
      config_file: conf.compassConf.configRbPath,
      css: conf.paths.styles,
      sass: conf.paths.sass,
      image: conf.paths.images
    }));
  } else {
    /* Otherwise we only compile sass files */
    sassFiles = sassFiles.pipe(sass());
  }

  return es.concat(cssFiles, sassFiles)
    .pipe(autoprefix({browsers: ['last 2 versions']}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(conf.paths.styles))
    .pipe(reload({stream: true}));
});

/* Concatenates vendor & custom scripts */
gulp.task('scripts', ['clean'], function () {
  var vendors = conf.scripts.lib.files.map(function(fileName) { return conf.scripts.lib.prefix + fileName; }),
      custom = conf.scripts.custom.files.map(function(fileName) { return conf.scripts.custom.prefix + fileName; });

  return gulp.src(vendors.concat(custom))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(conf.paths.scripts));
});

/* Clean dev concatenated css/js */
gulp.task('clean', function () {
  return gulp.src([
      conf.paths.scripts + '/main.js',
      conf.paths.styles + '/style.css'
    ], {read: false})
    .pipe(clean());
});

/* Clean dist folder */
gulp.task('clean-dist', function () {
  return gulp.src(conf.paths.dist, {read: false})
    .pipe(clean());
});

/* Dist image optimization */
gulp.task('images', function() {
  return gulp.src(conf.paths.images + '/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(conf.paths.dist + '/img'));
});

gulp.task('images-copy', function() {
  return gulp.src(conf.paths.images + '/**/*')
    .pipe(gulp.dest(conf.paths.dist + '/img'));
});

/* Dist scripts minification */
gulp.task('build-scripts', ['scripts'], function () {
  return gulp.src(conf.paths.scripts + '/main.js')
    .pipe(uglify({ mangle: false }))
    .pipe(rename("production.min.js"))
    .pipe(rev())
    .pipe(gulp.dest(conf.paths.dist + '/assets/scripts'))
    .pipe(rev.manifest('rev-manifest-scripts.json'))
    .pipe(gulp.dest(conf.paths.dist + '/assets'));
});

/* Dist styles minification */
gulp.task('build-styles', ['styles'], function () {
  return gulp.src(conf.paths.styles + '/style.css')
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(rename("production.min.css"))
    .pipe(rev())
    .pipe(gulp.dest(conf.paths.dist + '/assets/styles'))
    .pipe(rev.manifest('rev-manifest-styles.json'))
    .pipe(gulp.dest(conf.paths.dist + '/assets'));
});

/* Dist html minification and file rev replacement */
gulp.task('build-html', ['build-styles', 'build-scripts'], function () {
  var stylesRev = require('./'+ conf.paths.dist +'/assets/rev-manifest-styles.json')['production.min.css'],
      scriptsRev = require('./'+ conf.paths.dist +'/assets/rev-manifest-scripts.json')['production.min.js'];

  return gulp.src('app/playlist.html')
    .pipe(htmlreplace({
        'css': "assets/styles/" + stylesRev,
        'js': "assets/scripts/" + scriptsRev
      }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(conf.paths.dist));
});

/*
  Live browserSync server, taking care of the
  styles and scripts changes automatically
 */
gulp.task('serve', ['styles', 'scripts'], function () {
  /* Start browsersync for socket live reload */
  browserSync({
    server: "./" + conf.paths.app
  });

  /* Watch styles */
  gulp.watch([
    conf.paths.styles + '/**/*.scss',
    conf.paths.styles + '/**/*.css',
    '!' + conf.paths.styles + '/css/style.css',
    '!' + conf.paths.styles + '/style.css'
  ], ['styles']);

  /* Watch scripts */
  gulp.watch([
    conf.paths.scripts + '/**/*.js',
    '!' + conf.paths.scripts + '/main.js'
  ], ['scripts', 'styles', reload]);

  /* Watch html */
  gulp.watch(conf.paths.app + '/*.html').on('change', reload);
});

/*
  Build task, concat & uglify + image optimization
 */
gulp.task('build', [
  'clean-dist',
  'build-html'
]);
