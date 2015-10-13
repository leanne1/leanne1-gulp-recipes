# Delete or 'clean' files

When Gulp outputs files to a directory it does not automatically remove files that have since been deleted in the source file tree, so source-deleted files will remain in the output directory. To fix this run a 'clean' task on your output directory first. Note that this will completely delete the directory before re-outputting files. You can also delete individual files inside the directory (not shown).

```js
// npm install --save-dev del

var gulp = require('gulp');
var del = require('del');

gulp.task('foo', ['clean:foo'], function () {
  	gulp.src('./foo/**/*.js')
    	.pipe(gulp.dest('./dist/'));
});

gulp.task('clean:foo', function () {
  	del('./dist/');
});

```    