var gulp        = require('gulp')
var gutil       = require('gulp-util')
var browserify  = require('browserify')
var browserSync = require('browser-sync')
var source      = require('vinyl-source-stream')
var watchify    = require('watchify')


gulp.task('serve', ['js'], function() {
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  })

  gulp.watch(['./example/js/main.js'], ['js'])
})

gulp.task('js', function(){
  browserifyShare();
});

function browserifyShare() {
  // create browserify bundle
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: false
  })
  b = watchify(b)
  b.on('update', function () {
    bundleShare(b);
  })
  b.add('./example/js/main.js')
  bundleShare(b)
}

function bundleShare (b) {
  b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js/'));
}

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/js/'))
}