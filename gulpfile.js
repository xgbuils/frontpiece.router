var gulp        = require('gulp')
var gutil       = require('gulp-util')
var browserify  = require('browserify')
var browserSync = require('browser-sync')
var mocha       = require('gulp-mocha')
var source      = require('vinyl-source-stream')
var watchify    = require('watchify')

var path = require('path')

gulp.task('test', function () {
  var b = browserifyShare({
    source: './test/router_test.js', 
  }).bundle()
    .pipe(mocha({
      globals: {
        should: require('chai').should(),
        expect: require('chai').expect
      }
    }))
  /*gulp.src('./test/*_test.js')
    .pipe(mocha({
      globals: {
        should: require('chai').should(),
        expect: require('chai').expect
      }
    }))*/
})

gulp.task('serve', ['js'], function() {
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  })

  gulp.watch(['./example/js/main.js'], ['js'])
})

gulp.task('js', function(){
  var b = browserifyShare({
    source: './example/js/main.js',
    dest: './dist/js/main.js'
  })
  bundleShare(b, './dist/js/main.js')    
});

function browserifyShare(options) {
  // create browserify bundle
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: false
  })
  b = watchify(b)
  b.on('update', function () {
    bundleShare(b, options.dest);
  })
  b.add(options.source)
  return b
}

function bundleShare (b, dest) {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(path.basename(dest)))
    .pipe(gulp.dest(path.dirname(dest)))
}