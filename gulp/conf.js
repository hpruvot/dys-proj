// TODO: sass/css folders + compass gulp integration

var conf = {
  paths: {
    app: 'app',
    dist: 'dist',
    scripts: 'app/assets/js',
    styles: 'app/assets/stylesheets',
    css: 'app/assets/stylesheets/css',
    sass: 'app/assets/stylesheets/sass',
    images: 'app/assets/images',
    fonts: 'app/assets/fonts'
  },
  compassConf: {
    usesCompass: true,
    configRbPath: 'app/assets/config.rb'
  },
  scripts: {
    lib: {
      prefix: 'bower_components/',
      files: []
    },
    custom: {
      prefix: 'app/assets/js/',
      files: [
        'jquery-1.11.2.min.js',
        'menu.js',
        'playlist.js',
        'script.js',
        'landing.js'
      ]
    }
  },
  styles: {
    lib: {
      prefix: 'bower_components/',
      files: []
    },
    custom: {
      prefix: 'app/assets/stylesheets/',
      files: []
    }
  }
};

module.exports = conf;
