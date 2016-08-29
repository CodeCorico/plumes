'use strict';

var extend = require('extend'),
    fs = require('fs-extra'),
    path = require('path'),
    glob = require('glob'),
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

  config.default = config.default || [];

  var defaultTask = ['less', 'minify', 'html', 'resources'].concat(config.default);
  if (config.watcher) {
    defaultTask.push('watch');
  }

  gulp.task('default', defaultTask);

  fs.removeSync(config.path.public);

  gulp.task('less', function(done) {
    if (!config.path.less || !config.path.less.length) {
      return done();
    }

    gulp.src(config.path.less)
      .pipe(less({
        paths: config.lessPaths,
        plugins: (config.lessPlugins || []).concat([require('less-plugin-glob')])
      }))
      .pipe(rename(_publicByFeature))
      .pipe(gulp.dest(config.path.public))
      .pipe(cleanCSS({
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
    if (!config.path.js || !config.path.js.length) {
      return done();
    }

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
    if (!config.path.html || !config.path.html.length) {
      return done();
    }

    var injectFiles = [],
        injects = {};

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
    if (!config.path.resources || !config.path.resources.length) {
      return done();
    }

    var resourcesPatterns = [];

    config.path.resources.forEach(function(resourcesPattern) {
      if (resourcesPattern.indexOf('**') < 0) {
        return;
      }

      var featureIndex = resourcesPattern.split('**')[0].split('/').length - 1;

      glob.sync(resourcesPattern).forEach(function(directory) {
        var featureName = directory.split('/')[featureIndex];

        fs.copySync(directory, path.resolve(config.path.public, featureName));
      });

      resourcesPatterns.push(resourcesPattern + path.sep + 'inject-*');
    });

    if (!resourcesPatterns.length) {
      return done();
    }

    resourcesPatterns.forEach(function(resourcesPattern) {

      glob.sync(resourcesPattern).forEach(function(file) {
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
