# Automate semver versioning update and git tagging

This recipe is used for automating releases to a repo using semver versioning with options ```patch```, ```minor```, and ```major```. It automates the steps of updating a repo's ```bower.json``` and ```package.json``` version number, creates a new git tag and pushes the new tag to the remote repo. Once the task has finished, the newly created tag is reported back in the console and can be used to make a Github release.

```js
// npm install --save-dev gulp-git gulp-bump gulp-util

var gulp = require('gulp');
var gutil = require('gulp-util');
var git = require('gulp-git');
var bump = require('gulp-bump');  
var fs = require('fs');

//CLI tasks
gulp.task('release:patch', ['bump:patch'], function() { 
    return createTag(); 
});

gulp.task('release:minor', ['bump:minor'], function() { 
    return createTag(); 
});

gulp.task('release:major', ['bump:major'], function() { 
    return createTag(); 
});

//PRIVATE TASKS
gulp.task('bump:patch', function() {
    return bumpPackage('patch'); 
});

gulp.task('bump:minor', function() {
    return bumpPackage('minor'); 
});

gulp.task('bump:major', function() {
    return bumpPackage('major'); 
});

function bumpPackage(importance) {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(bump({type: importance}))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('Gulp: bumped package version'));
}

function createTag() {
    var version = getPackageJsonVersion();
    git.tag(version, 'Created Git tag for version: ' + version, function (error) {
        if (error) {
            gutil.log(gutil.colors.red(Error ('Git tag error: ') + error.message));
            return;
        }
        git.push('origin', 'master', {args: '--tags'});
    });
    
    gutil.log(gutil.colors.bgGreen(' You must now create a Github release v' + version + ' using tag ' + version + ' '));
    
    function getPackageJsonVersion () {
        return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    };
}
```