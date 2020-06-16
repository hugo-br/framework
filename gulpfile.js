var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    cssmin      = require('gulp-cssnano'),
    prefix      = require('gulp-autoprefixer'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    sassLint    = require('gulp-sass-lint'),
    sourcemaps  = require('gulp-sourcemaps'),
    runSequence = require('run-sequence'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    babel       = require('gulp-babel');    

var displayError = function(error) {
  // Initial building up of the error
  var errorString = '[' + error.plugin.error.bold + ']';
  errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

  // If the error contains the filename or line number add it to the string
  if(error.fileName)
      errorString += ' in ' + error.fileName;

  if(error.lineNumber)
      errorString += ' on line ' + error.lineNumber.bold;

  // This will output an error like the following:
  // [gulp-sass] error message in file_name on line 1
  console.error(errorString);
};

var onError = function(err) {
  notify.onError({
    title:    "Gulp",
    subtitle: "Failure!",
    message:  "Error: <%= error.message %>",
    sound:    "Basso"
  })(err);
  this.emit('end');
};

var sassOptions = {
  outputStyle: 'expanded'
};

var prefixerOptions = {
  overrideBrowserslist: ['last 4 version', 'ie > 8', 'safari 5']
};

// BUILD SUBTASKS
// ---------------

gulp.task('styles', function() {
  return gulp.src('scss/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(prefix(prefixerOptions))
    .pipe(gulp.dest('css'))

	// minified each
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css/min'))
	
	// clean combined 
	.pipe(concat('lci.combined.css'))
	.pipe(gulp.dest('css/combined'))
	
	
	// minified combined 
  //  .pipe(concat('lci.combined.css'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css/combined'))
	
});


// minify fonts
gulp.task('fonts', function() {
  return gulp.src('scss/*fonts.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(prefix(prefixerOptions))
  //  .pipe(rename('main.css'))
    .pipe(gulp.dest('css'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('00-prod'))
});



/* Build the prod CSS file */
gulp.task('prod-css', function() {
  return gulp.src(['scss/*.scss','!scss/mixins.scss', '!scss/cta.scss' ])
  .pipe(plumber({errorHandler: onError}))
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions))
  .pipe(prefix(prefixerOptions))
  .pipe(concat('lci.combined.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('00-prod/css'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('00-prod'))
});


gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['styles']);
});

/****************
        js
 *****************/ 
var scriptFiles = ['js/*.js'];
//var minScripts =  ['js/min/lazyload.min.js', 'js/min/picturefill.min.js', 'js/min/dragscroll.min.js', 'js/min/youtube.min.js', 'js/min/defer.min.js'];
//var minJs = ['js/min/*', '!js/min/dragscroll.min.js', '!'];
//
var minJs = ['js/min/*', '!js/min/form.min.js', '!js/min/lc-ticker.min.js'];

gulp.task('js', function() {
  return gulp.src(['js/**.js'])
    .pipe(babel({
        presets: ['@babel/env']
    })) 
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('js/min'));
  //  .pipe(concat('lci-combined.js'))
   // .pipe(gulp.dest('js/combined/lci-combined.min.js'))
});

/* Build the prod Js file */
// minified fold
gulp.task('prod-js', function() {
  return gulp.src(minJs)
    .pipe(concat('lci-combined.js'))
    .pipe(gulp.dest('00-prod/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('00-prod'));
});


// AUTO TASKS
// ------------

gulp.task('css', function () {
	gulp.watch(['scss/*.scss'], gulp.series('styles'));
});
