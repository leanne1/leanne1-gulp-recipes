# Bundle commonJS modules with ES6 support, uglify and sourcemaps

## Recipe usage

- For each bundle you want to create:
    1. Create a bundle opts object. This should contain:
        - The path to your bundle entry point
        - The filename of the bundle to be created 
        - The path to the bundle dest folder
    1. Create a setup for the bundle and cache it. This should call ```setUpBrowserify``` passing in three args:
        1. An object containing bundle-specific browserify options. The minimum this object requires is an ```entries``` array. Into the array add the entry point path from your bundle opts object created in step 1
        1. The bundleFilename from your bundle opts object created in step 1
        1. The bundleDest path from your bundle opts object created in step 1
    1. Create a gulp task that builds your bundle and can be added to your gulp default task. The gulp task should call the ```bundle``` function and pass in the following args:
        1. The cached bundle setup created in step 2
        1. The bundleFilename from your bundle opts object created in step 1
        1. The bundleDest path from your bundle opts object created in step 1
    1. Add the gulp task to your default gulp task. You don't need to set up an additional watcher because watchify will watch and automatically re-bundle your entry points on change   

## How the recipe works
The task works by wrapping browserify in a watchify wrapper. Watchify handles watching and re-bundling your browserify modules. This means that you do not need to create a separate watch task for your browserify entry points. Watchify is a more efficient watch method for browserify because it only rebundles the files that have changed.

The recipe allows you to set up multiple entry-bundle pairs, so you can create, watch and build multiple browserify bundles in the same project. Generally you will only have a single ```site.*.js``` bundle per microsite but you might need a second if you are also generating a ```page.*.js``` bundle.

```js
// npm install --save-dev browserify watchify babelify vinyl-source-stream vinyl-buffer gulp-util gulp-sourcemaps lodash.assign gulp-uglify gulp-rename

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

function bundle(b, bundleName, bundleDest) {
    return b.bundle()
        .on('error', function(err){
            gutil.log(gutil.colors.red(Error ('Browserify Error: ') + err.message));
            this.emit('end');
        })
        .pipe(source(bundleName))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulp.dest(bundleDest)) // Output a non-minified version of your bundle for dev reference
        .pipe(rename(bundleName.replace('debug', 'min')))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(bundleDest));
}

var globalBrowserifyOpts = {
    paths: [
        './node_modules', 
        './bower_components/'
    ],
    debug: true
};

function setUpBrowserify(browserifyOpts, bundleName, bundleDest) {
    var opts = assign( {}, watchify.args, globalBrowserifyOpts, browserifyOpts );
    var b = watchify( browserify(opts) ); 
        b.transform( babelify );
        b.on('update', function(){
            bundle(b, bundleName, bundleDest);
        });
        b.on('log', gutil.log);
    return b;
}

// Define Browserify bundles, setup Browserify tasks, and create gulp tasks
// SITE BUNDLE
var siteBundleOpts = {
    entry: './Content/Scripts/site.js',
    bundleFilename: 'site.debug.js',
    bundleDest: './static/js/'
}
var siteBundle = setUpBrowserify({
        entries: [siteBundleOpts.entry]
    },
    siteBundleOpts.bundleFilename,
    siteBundleOpts.bundleDest
);
gulp.task('modules:site-js', function() { 
    bundle(siteBundle, siteBundleOpts.bundleFilename, siteBundleOpts.bundleDest);
});

// 'OTHER' BUNDLE
var otherBundleOpts = {
    entry: './Content/Scripts/other.js',
    bundleFilename: 'other.debug.js',
    bundleDest: './static/js/'
}
var otherBundle = setUpBrowserify({
        entries: [otherBundleOpts.entry]
    },
    otherBundleOpts.bundleFilename,
    otherBundleOpts.bundleDest
);
gulp.task('modules:other-js', function() { 
    bundle(otherBundle, otherBundleOpts.bundleFilename, otherBundleOpts.bundleDest);
});

/* You don't need additional js watch tasks */
gulp.task('default', [ '...', '...', '...', 'modules:site-js', 'modules:other-js']); 
```
