var gulp = require('gulp'),
    // usemin = require('gulp-usemin'),
    // wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch');
    // minifyCss = require('gulp-cssnano'),
    // minifyJs = require('gulp-uglify'),
    // concat = require('gulp-concat'),
    // less = require('gulp-less'),
    // rename = require('gulp-rename'),
    // minifyHTML = require('gulp-htmlmin');

var paths = {
    scripts: 'src/js/**/*.*',
    styles: 'src/less/**/*.*',
    images: 'src/img/**/*.*',
    templates: 'src/templates/**/*.html',
    index: 'src/index.html',
    bower_fonts: 'src/components/**/*.{ttf,woff,eof,svg}',
};


/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'src',
        livereload: true,
        port: 8888
    });
});

gulp.task('livereload', function() {
    gulp.src(['src/**/*.*'])
        .pipe(watch(['src/**/*.*']))
        .pipe(connect.reload());
});

gulp.task('default', ['webserver','livereload']);
