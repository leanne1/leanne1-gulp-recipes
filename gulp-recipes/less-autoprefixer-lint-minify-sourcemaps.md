# Less compiling with linting, minifying, and sourcemaps

CSS3 vendor prefixes do not need to be added at source as these are added post-process by autoprefixer. Store ```browserslist``` in a parent (root) directory to determine browsers to target for prefixes. Less error reporting handled without exiting current task. LessBower defaults Less ```@import``` paths to ```bower_components``` so when importing bower files, start the ```@import``` path after ```bower_components/```. Uses ```csslintrc.json``` to lint compiled css.

```js
// npm install --save-dev gulp-less gulp-csslint gulp-autoprefixer gulp-minify-css gulp-sourcemaps gulp-less-reporter less-plugin-bower-resolve gulp-util gulp-rename

var gulp = require('gulp');
var less = require('gulp-less');
var csslint = require('gulp-csslint');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var reporter = require('gulp-less-reporter');
var lessBower = require('less-plugin-bower-resolve');
var rename = require('gulp-rename');

gulp.task('modules:site-less', function () {
    lessModules('./**/*.less', 'site.debug.css', './static/css/');
});

// Broken out into a function so you can create multiple source-output bundles if needed
function lessModules(sourceFiles, bundleName, bundleDest) {
    return gulp.src(sourceFiles)
        .pipe(less({
            plugins: [lessBower] //Resolve @import paths to 'bower_components'
        }))
        .on('error', function(err){
            gutil.log(gutil.colors.red(Error ('Less Error: ') + err.message));
            this.emit('end');
        })
        .pipe(autoprefixer()) //Add ./config/autoprefixer/browserslist file to root dir
        .pipe(csslint('./config/lint/css/csslintrc.json'))
        .pipe(csslint.reporter())
        .pipe(rename(bundleName))
        .pipe(gulp.dest(bundleDest))
        .pipe(rename(bundleName.replace('debug', 'min')))
        .pipe(sourcemaps.init())
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(bundleDest));
}
```