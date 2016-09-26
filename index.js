'use strict';

var extend = require('extend'),
    fs = require('fs-extra'),
    path = require('path'),
    glob = require('glob'),
    through = require('through2'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
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
    watcher: true,
    lessPaths: null,
    lessPlugins: null
  }, config);

  config.path.less = typeof config.path.less == 'string' ? [config.path.less] : config.path.less;
  config.path.js = typeof config.path.js == 'string' ? [config.path.js] : config.path.js;
  config.path.html = typeof config.path.html == 'string' ? [config.path.html] : config.path.html;
  config.path.resources = typeof config.path.resources == 'string' ? [config.path.resources] : config.path.resources;

  function _public() {
    return typeof config.path.public == 'function' ? config.path.public() : gulp.dest(config.path.public);
  }

  function _publicByFeature(filePath) {
    var featuresDir = 'features' + path.sep,
        featuresPosition = filePath.dirname.indexOf(featuresDir);

    if (featuresPosition < 0) {
      filePath.dirname = filePath.dirname.split(path.sep)[0];

      return;
    }

    featuresPosition += featuresDir.length;

    featuresPosition = filePath.dirname.substr(featuresPosition, filePath.dirname.length - featuresPosition);
    filePath.dirname = featuresPosition.split(path.sep)[0];
  }

  function _renameByFeature(file) {
    var featuresDir = 'features' + path.sep,
        featuresPosition = file.path.indexOf(featuresDir);

    if (featuresPosition < 0) {
      return;
    }

    featuresPosition += featuresDir.length;
    featuresPosition = file.path.substr(featuresPosition, file.path.length - featuresPosition);
    featuresPosition = featuresPosition.split(path.sep);

    file.path = featuresPosition[0] + '/' + featuresPosition.pop();
  }

  config.default = config.default || [];

  var defaultTask = ['less', 'minify', 'html', 'resources'].concat(config.default);
  if (config.watcher) {
    defaultTask.push('watch');
  }

  gulp.task('default', defaultTask);

  gulp.task('less', function(done) {
    if (!config.path.less || !config.path.less.length) {
      return done();
    }

    gulp
      .src(config.path.less)
      .pipe(less({
        paths: config.lessPaths,
        plugins: (config.lessPlugins || []).concat([require('less-plugin-glob')])
      }))
      .pipe(rename(_publicByFeature))
      .pipe(_public())
      .pipe(cleanCSS({
        keepSpecialComments: 0,
        processImport: false
      }))
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(_public())
      .on('end', done);
  });

  gulp.task('minify', function(done) {
    if (!config.path.js || !config.path.js.length) {
      return done();
    }

    gulp
      .src(config.path.js)
      .pipe(sourcemaps.init())
      .pipe(rename(_publicByFeature))
      .pipe(_public())
      .pipe(uglify())
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(_public())
      .on('end', done);
  });

  gulp.task('html', function(done) {
    if (!config.path.html || !config.path.html.length) {
      return done();
    }

    var injectFiles = [],
        injects = {},
        files = [];

    config.path.html.forEach(function(htmlPattern) {
      injectFiles = injectFiles.concat(glob.sync(htmlPattern.replace('*.html', 'inject-*.html')));
    });

    injectFiles.forEach(function(injectFile) {
      var injectName = injectFile.match(/inject-(.*?)\.html$/);

      if (injectName && injectName.length > 1) {
        injectName = injectName[1];

        injects[injectName] = injects[injectName] || [];
        injects[injectName].push(fs.readFileSync(injectFile, 'utf-8'));
      }
    });

    gulp
      .src(config.path.html)
      .pipe(through.obj(function(file, encoding, throughDone) {
        if (file.path.split(path.sep).pop().indexOf('inject-') < 0) {
          files.push(file);
        }

        throughDone();
      }, function(throughDone) {
        var transform = this;

        files.forEach(function(file) {
          transform.push(file);
        });

        throughDone();

        transform.emit('end');
      }))
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
      .pipe(_public())
      .on('end', done);
  });

  gulp.task('resources', function(done) {
    if (!config.path.resources || !config.path.resources.length) {
      return done();
    }

    var resourcesSrc = [],
        injectsSrc = [],
        files = [];

    config.path.resources.forEach(function(p) {
      resourcesSrc.push(p + '/*');
      injectsSrc.push(p + '/inject-*');
    });

    for (var i = 0; i < config.path.resources.length; i++) {
      var p = config.path.resources[i];

      config.path.resources[i] += p.substr(p.length - 2, 2) != '/*' ? '/*' : '';
    }

    gulp
      .src(resourcesSrc, {
        base: './'
      })
      .pipe(through.obj(function(file, encoding, throughDone) {
        if (file.path.split(path.sep).pop().indexOf('inject-') < 0) {
          files.push(file);
        }

        throughDone();
      }, function(throughDone) {
        var transform = this;

        files.forEach(function(file) {
          _renameByFeature(file);

          transform.push(file);
        });

        throughDone();

        transform.emit('end');
      }))
      .pipe(_public())
      .on('end', function() {

        files = [];

        gulp
          .src(injectsSrc, {
            base: './'
          })
          .pipe(through.obj(function(file, encoding, throughDone) {
            files.push(file);

            throughDone();
          }, function(throughDone) {
            var transform = this;

            files.forEach(function(file) {
              var injectPath = file.path.match(/inject-(?=[^inject-])(.*?\..*?)$/);

              if (!injectPath || injectPath.length < 2) {
                return;
              }

              injectPath = injectPath[1].split('_');

              if (injectPath.length < 2) {
                return;
              }

              file.path = injectPath[0] + '/' + injectPath[1];

              transform.push(file);
            });

            throughDone();

            transform.emit('end');
          }))
          .pipe(_public())
          .on('end', done);
      });
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
