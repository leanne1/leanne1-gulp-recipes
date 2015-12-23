# Javascript linting with JSHint and JSCS or ESLint

The linters include JSHint which lints javascript syntax against well-formedness, and JSCS which lints javascript against code style, or swap both of these for ESLint which is the preferred choice for ES6 / JSX (React) projects. Both the JSCS and ESLint rules come from the Airbnb preset which validates against the Airbnb javascript styleguide.

Using one of these recipes with the `.jshintrc` and `.jscsrc` OR `.eslintrc` config files in the root of your project which specify standardised [JSHint rules](http://jshint.com/docs/options/), [JSCS](https://github.com/jscs-dev/node-jscs/blob/master/presets/airbnb.json) and [ESLint](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) rules matched against the Airbnb javascript styleguide. You may need to add your own `predef` and `globals` options to the `.jshintrc` file to match your project.

```js
// Using ESLint
// npm install --save-dev gulp-eslint babel-eslint eslint eslint-config-airbnb eslint-plugin-react

var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint:js', function() {
	return gulp.src(['**/*.js')
        .pipe(eslint()) // requires supplied .eslintrc file in root of project
        .pipe(eslint.format());
});
```

```js
// Using JSHint and JSCS
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