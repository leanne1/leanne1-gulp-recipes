# Concatenate files

```js
// npm install --save-dev gulp-concat

var gulp = require('gulp');
var concat = require('gulp-concat');

var sourceScripts = [
	'./lib/*.js', 
	'./foo/*.js'
];

gulp.task('concat:scripts', function() {
  	return gulp.src(sourceScripts)
   		.pipe(concat('all.js'))
    	.pipe(gulp.dest('./dist/'));
});
```