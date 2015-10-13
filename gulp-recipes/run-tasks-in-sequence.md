# Run tasks in sequence

**Note**: If you are using Gulp 4 you should have access to the ```series()``` and ```parallel()``` methods which allow you to run tasks either in series or parallel.

By default, Gulp runs tasks with maximum concurrency - e.g. it launches all the tasks at once and waits for nothing. If you want to create a series where tasks run in a particular order, use this recipe.	Note that tasks needs to run a callback or return a stream for run sequence to work correctly. Read the [run-sequence documentation](https://www.npmjs.com/package/run-sequence) when implementing this recipe.

```js
// npm install --save-dev run-sequence

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function( callback ) {
    runSequence(
        ['taskA'], //Run this first before anything else
        ['taskB', 'taskC', 'taskD'], //Run these tasks next, concurrently
        ['taskE', 'taskF'] //Run these tasks last, after the previous tasks have run
    , callback);
});

```
If you simply want to ensure that a set of tasks are always run before another task executes, add an array of tasks as the second argument to ```gulp.task```. For example:

```js

//clean:foo will always be run first, whenever foo is run
gulp.task('foo', ['clean:foo'], function () {
  	gulp.src('./foo/**/*.js')
    	.pipe(gulp.dest('./dist/'));
});

gulp.task('clean:foo', function () {
  	del('./dist/', { force: true });
});

```   