'use strict';

var extend = require('extend'),
    path = require('path'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

var Plumes = function(gulp, config) {

  config = extend(true, {
    path: {
      less: './features/**/css/*.less',
      js: './features/**/js/*.js',
      html: './features/**/html/*.html',
      resources: './features/**/resources/*',
      public: './public'
    },
    default: null,
    watchs: [],
    watcher: true
  }, config);

  function _publicByFeature(filePath) {
    filePath.dirname = filePath.dirname.split(path.sep)[0];
  }

  config.default = config.default || [];

  var defaultTask = ['less', 'minify', 'html', 'resources'].concat(config.default);
  if (config.watcher) {
    defaultTask.push('watch');
  }

  gulp.task('default', defaultTask);

  gulp.task('less', function(done) {
    gulp.src(config.path.less)
      .pipe(less())
      .pipe(rename(_publicByFeature))
      .pipe(gulp.dest(config.path.public))
      .pipe(minifyCSS({
        keepSpecialComments: 0
      }))
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest(config.path.public))
      .on('end', done);
  });

  gulp.task('minify', function(done) {
    gulp.src(config.path.js)
      .pipe(sourcemaps.init())
      .pipe(rename(_publicByFeature))
      .pipe(gulp.dest(config.path.public))
      .pipe(uglify())
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.path.public))
      .on('end', done);
  });

  gulp.task('html', function(done) {
    gulp.src(config.path.html)
      .pipe(rename(_publicByFeature))
      .pipe(gulp.dest(config.path.public))
      .on('end', done);
  });

  gulp.task('resources', function(done) {
    gulp.src(config.path.resources)
      .pipe(rename(_publicByFeature))
      .pipe(gulp.dest(config.path.public))
      .on('end', done);
  });

  gulp.task('watch', function() {
    gulp.watch(config.path.less, ['less']);
    gulp.watch(config.path.js, ['minify']);
    gulp.watch(config.path.html, ['html']);
    gulp.watch(config.path.html, ['resources']);

    if (config.watchs && config.watchs.length) {
      config.watchs.forEach(function(watchFunc) {
        watchFunc();
      });
    }
  });

};

module.exports = Plumes;
