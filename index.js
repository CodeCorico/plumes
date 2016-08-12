'use strict';

var extend = require('extend'),
    fs = require('fs-extra'),
    path = require('path'),
    glob = require('glob'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    insert = require('gulp-insert');

var Plumes = function(gulp, config) {

  config = extend(true, {
    path: {
      less: './features/**/css/*.less',
      js: './features/**/js/*.js',
      html: './features/**/html/*.html',
      resources: './features/**/resources',
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

  fs.removeSync(config.path.public);

  gulp.task('less', function(done) {
    gulp.src(config.path.less)
      .pipe(less({
        plugins: [require('less-plugin-glob')]
      }))
      .pipe(rename(_publicByFeature))
      .pipe(gulp.dest(config.path.public))
      .pipe(minifyCSS({
        keepSpecialComments: 0,
        processImport: false
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
    var injectPath = config.path.html.replace('*.html', 'inject-*.html'),
        injectFiles = glob.sync(injectPath),
        injects = {};

    injectFiles.forEach(function(injectFile) {
      var injectName = injectFile.match(/inject-(.*?)\.html$/);

      if (injectName && injectName.length > 1) {
        injectName = injectName[1];

        injects[injectName] = injects[injectName] || [];
        injects[injectName].push(fs.readFileSync(injectFile, 'utf-8'));
      }
    });

    gulp.src(config.path.html)
      .pipe(rename(_publicByFeature))
      .pipe(insert.transform(function(contents) {
        contents = contents.replace(/({{#inject (.*?[^\/])}}([\S\s]*?){{\/inject}})/ig, function(match, full, name, content) {
          name = (name || '').trim();

          return injects[name] ? injects[name].join('\n') : content;
        });

        contents = contents.replace(/({{#inject (.*?)\/}})/ig, function(match, full, name) {
          name = (name || '').trim();

          return injects[name] ? injects[name].join('\n') : '';
        });

        return contents;
      }))
      .pipe(gulp.dest(config.path.public))
      .on('end', done);
  });

  gulp.task('resources', function(done) {
    if (config.path.resources.indexOf('**') < 0) {
      return done();
    }

    var featureIndex = config.path.resources.split('**')[0].split('/').length - 1;

    glob.sync(config.path.resources).forEach(function(directory) {
      var featureName = directory.split('/')[featureIndex];

      fs.copySync(directory, path.resolve(config.path.public, featureName));
    });

    var injectResoucesPath = config.path.resources + '/inject-*';

    glob.sync(injectResoucesPath).forEach(function(file) {
      var injectPath = file.match(/inject-(?=[^inject-])(.*?\..*?)$/);

      if (!injectPath || injectPath.length < 2) {
        return;
      }

      injectPath = injectPath[1].split('_');

      if (injectPath.length < 2) {
        return;
      }

      fs.copySync(path.resolve(file), path.resolve(config.path.public, injectPath[0], injectPath[1]));
    });

    done();
  });

  gulp.task('watch', function() {
    gulp.watch(config.path.less, ['less']);
    gulp.watch(config.path.js, ['minify']);
    gulp.watch(config.path.html, ['html']);
    gulp.watch(config.path.resources, ['resources']);

    if (config.watchs && config.watchs.length) {
      config.watchs.forEach(function(watchFunc) {
        watchFunc();
      });
    }
  });

};

module.exports = Plumes;
