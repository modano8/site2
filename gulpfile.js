/* gulpfile.js */
var
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload'),
  connect = require('gulp-connect'),
  nunjucksRender = require('gulp-nunjucks-render');

// source and distribution folder
var
  source = 'src/',
  dest = 'dist/',
  build = 'build/';

// Bootstrap scss source
var bootstrapSass = {
  in: './bower_components/bootstrap-sass/'
};

// css source file: .scss files
var css = {
  in: source + 'css/main.scss',
  out: dest + 'css/bootstrap.css',
  watch: source + 'css/**/*',
  additional: source + 'css/',
  sassOpts: {
    outputStyle: 'nested',
    precison: 3,
    errLogToConsole: true,
    includePaths: [bootstrapSass.in + 'assets/stylesheets']
  },
  build: build + 'css/'
};

// js source file
var js = {
  in: source + 'js/*.js',
  out: dest + 'js/',
  watch: source + 'js/*.js',
  partials: source + 'partials/**/*.js'
};

// copy additional css to dest
gulp.task('additional', function () {
  return gulp
    .src(css.additional)
    .pipe(gulp.dest(css.out));
})

// server connect
gulp.task('connect', function () {
  connect.server({
    root: [dest],
    livereload: true
  });
});

// copy js to dest
gulp.task('js', function () {
  return gulp
    .src(js.in)
    .pipe(gulp.dest(js.out));
});

// compile scss
gulp.task('sass', function() {
    return gulp.src(css.in)
        .pipe(sass(css.sassOpts))
        .pipe(gulp.dest(css.out));
});

gulp.task('nunjucks', function () {
  // Gets .html and .nunjucks files in pages
  return gulp.src('src/pages/**/*.+(html|nunjucks)')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    // output files in app folder
    .pipe(gulp.dest('dist/'))
});

// default task
gulp.task('default', ['connect', 'additional', 'js', 'sass', 'nunjucks'], function () {
  gulp.watch(css.watch, ['sass']);
});