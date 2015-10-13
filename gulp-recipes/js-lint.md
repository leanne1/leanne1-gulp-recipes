# Javascript linting with JSHint and JSCS

The linters include JSHint which lints javascript syntax against well-formedness, and JSCS which lints javascript against code style. The JSCS rules come from the Airbnb preset which validates against the Airbnb javascript styleguide.

Using this recipe with the ```.jshintrc``` and ```.jscsrc``` config files in the root of your project which specify standardised [JSHint rules](http://jshint.com/docs/options/) and [rules matched against the Airbnb javascript styleguide](https://github.com/jscs-dev/node-jscs/blob/master/presets/airbnb.json). You may need to add your own ```predef``` and ```globals``` options to the ```.jshintrc``` file to match your project.

```js
// npm install --save-dev gulp-jshint jshint-stylish gulp-jscs

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('lint:js', function() {
    return gulp.src('**/*.js')
        .pipe(jshint('/config/lint/js/.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs()); // requires supplied .jscsrc file in root of project
});
```