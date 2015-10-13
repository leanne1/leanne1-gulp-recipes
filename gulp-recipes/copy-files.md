# Copy a file

```js
var gulp = require('gulp');

gulp.task('copy:somefiles', function () {
  	gulp.src('./copy/source/**/*')
    	.pipe(gulp.dest('./copy/output/'));
});
```