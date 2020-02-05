var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    uglifyes    = require('uglify-es'),
    composer    = require('gulp-uglify/composer'),
    uglify      = composer(uglifyes, console),
    jade        = require('gulp-jade'),
    less        = require('gulp-less'),
    path        = require('path'),
    livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    marked      = require('marked'), // For :markdown filter in jade
    path        = require('path'),
    changed     = require('gulp-changed'),
    prettify    = require('gulp-html-prettify'),
    w3cjs       = require('gulp-w3cjs'),
    rename      = require('gulp-rename'),
    flip        = require('css-flip'),
    through     = require('through2'),
    gutil       = require('gulp-util'),
    htmlify     = require('gulp-angular-htmlify'),
    minifyCSS   = require('gulp-minify-css'),
    gulpFilter  = require('gulp-filter'),
    expect      = require('gulp-expect-file'),
    gulpsync    = require('gulp-sync')(gulp),
    ngAnnotate  = require('gulp-ng-annotate'),
    sourcemaps  = require('gulp-sourcemaps'),
    PluginError = gutil.PluginError;

// LiveReload port. Change it only if there's a conflict
// var lvr_port = 35729;
var lvr_port = 1212;

var W3C_OPTIONS = {
  // Set here your local validator if your using one. leave it empty if not
  //uri: 'http://validator/check',
  doctype: 'HTML5',
  output: 'json',
  // Remove some messages that angular will always display.
  filter: function(message) {
    if( /Element head is missing a required instance of child element title/.test(message) )
      return false;
    if( /Attribute .+ not allowed on element .+ at this point/.test(message) )
      return false;
    if( /Element .+ not allowed as child of element .+ in this context/.test(message) )
      return false;
    if(/Comments seen before doctype./.test(message))
      return false;
  }
};

// production mode (see build task)
var isProduction = false;
var isDesenv = false;
var isHomologa = false;
var useSourceMaps = false;

// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!'+hidden_files;

// VENDOR CONFIG
var vendor = {
  // vendor scripts required to start the app
  base: {
    source: require('./vendor.base.json'),
    dest: '../app/js',
    name: 'base.js'
  },
  // vendor scripts to make to app work. Usually via lazy loading
  app: {
    source: require('./vendor.json'),
    dest: '../vendor'
  }
};

// SOURCES CONFIG
var source = {
  scripts: {
    app:    [ 'js/app.init.js',
              'js/modules/*.js',
              'js/modules/**/*.js'
            ],
    watch: ['js/**/*.js']
  },
  styles: {
    app: {
      main: ['less/app.less'],
      dir:  'less',
      watch: ['less/*.less', 'less/**/*.less']
    },
  },
  bootstrap: {
    main: 'less/bootstrap/bootstrap.less',
    dir:  'less/bootstrap',
    watch: ['less/bootstrap/*.less']
  }
};

// BUILD TARGET CONFIG
var build = {
  scripts: {
    app: {
      main: 'app.js',
      dir: '../app/js'
    }
  },
  styles: '../app/css',
  templates: {
    app: '..',
    views: '../app/views',
    pages: '../app/pages'
  }
};

//---------------
// TASKS
//---------------



// JS APP
gulp.task('scripts:app', function() {
    // Minify and copy all JavaScript (except vendor scripts)
  var options = {};

    if(isDesenv){
      source.scripts.app.push('env/desenv.js');
    }else if(isProduction){
      source.scripts.app.push('env/prod.js');
    }else if(isHomologa){
      source.scripts.app.push('env/homologa.js');
    }else {
      source.scripts.app.push('env/local.js');
    }
    return gulp.src(source.scripts.app)
      .pipe( useSourceMaps ? sourcemaps.init() : gutil.noop())
      .pipe(concat(build.scripts.app.main))
      .pipe(ngAnnotate())
      .on("error", handleError)
      .pipe(isProduction ? uglify(options) : gutil.noop())
      .on("error", handleError)
      .pipe( useSourceMaps ? sourcemaps.write() : gutil.noop() )
      .pipe(gulp.dest(build.scripts.app.dir));
});


// VENDOR BUILD
gulp.task('scripts:vendor', ['scripts:vendor:base', 'scripts:vendor:app']);

//  This will be included vendor files statically
gulp.task('scripts:vendor:base', function() {

    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(vendor.base.source)
        .pipe(expect(vendor.base.source))
        .pipe(uglify())
        .pipe(concat(vendor.base.name))
        .pipe(gulp.dest(vendor.base.dest));
});

// copy file from bower folder into the app vendor folder
gulp.task('scripts:vendor:app', function() {

  var jsFilter = gulpFilter('**/*.js');
  var cssFilter = gulpFilter('**/*.css');

  return gulp.src(vendor.app.source, {base: 'bower_components'})
      .pipe(expect(vendor.app.source))
      .pipe(jsFilter)
      .pipe(uglify())
      .pipe(jsFilter.restore())
      .pipe(cssFilter)
      .pipe(minifyCSS())
      .pipe(cssFilter.restore())
      .pipe( gulp.dest(vendor.app.dest) );

});

// APP LESS
gulp.task('styles:app', function() {
    return gulp.src(source.styles.app.main)
        .pipe( useSourceMaps ? sourcemaps.init() : gutil.noop())
        .pipe(less({
            paths: [source.styles.app.dir]
        }))
        .on("error", handleError)
        .pipe( isProduction ? minifyCSS() : gutil.noop() )
        .pipe( useSourceMaps ? sourcemaps.write() : gutil.noop())
        .pipe(gulp.dest(build.styles));
});



// BOOSTRAP
gulp.task('bootstrap', function() {
    return gulp.src(source.bootstrap.main)
        .pipe(less({
            paths: [source.bootstrap.dir]
        }))
        .pipe(minifyCSS())
        .on("error", handleError)
        .pipe(gulp.dest(build.styles));
});




//---------------
// WATCH
//---------------

// Rerun the task when a file changess
gulp.task('watch', function() {
    livereload.listen();

  gulp.watch(source.scripts.watch,           ['scripts:app']);
  gulp.watch(source.styles.app.watch,        ['styles:app']);
  gulp.watch(source.bootstrap.watch,         ['styles:app']); //bootstrap

          gulp.watch([

              '../app/**'

          ]).on('change', function(event) {

              livereload.changed( event.path );

          });
});


//---------------
// DEFAULT TASK
//---------------


// build for production (minify)
gulp.task('buildProd', ['prod', 'default']);
gulp.task('buildJenkins', ['prod', 'jenkins']);
gulp.task('buildDev', ['dev', 'default']);
gulp.task('buildHomologa', ['homologa', 'jenkins']);
gulp.task('buildDevJenkins', ['dev', 'jenkins']);


gulp.task('prod', function() {
  isProduction = true;
});

gulp.task('dev', function() {
  isDesenv = true;
});

gulp.task('homologa', function() {
  isHomologa = true;
});

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function(){ useSourceMaps = true; });

// default (no minify)
gulp.task('default', gulpsync.sync([
          'scripts:vendor',
          'scripts:app',
          'start'
        ]), function(){

  gutil.log(gutil.colors.cyan('************'));
  gutil.log(gutil.colors.cyan('* All Done *'), 'You can start editing your code, LiveReload will update your browser after any change..');
  gutil.log(gutil.colors.cyan('************'));

});

gulp.task('start',[
          'styles:app',
          'watch'
        ]
      );

gulp.task('jenkins', gulpsync.sync([
          'scripts:vendor',
          'scripts:app',
          'startjenkins'
        ]));

gulp.task('startjenkins',[
          'styles:app',
          ]
        );

gulp.task('done', function(){
  console.log('All Done!! You can start editing your code, LiveReload will update your browser after any change..');
});

// Error handler
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}
