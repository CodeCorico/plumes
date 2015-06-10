'use strict';

var gulp = require('gulp'),
    Plumes = require('./index');

gulp.task('fontawesome', function(done) {
  gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('public/layout/fonts'))
    .on('end', done);
});

new Plumes(gulp, {
  paths: {
    less: './features/**/css/*.less',
    js: './features/**/js/*.js',
    html: './features/**/html/*.html',
    public: './public'
  },
  default: ['fontawesome']
});
