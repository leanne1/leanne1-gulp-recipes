# HTML lint and minify

```js
// npm install --save-dev gulp-htmlhint gulp-minify-html

var gulp = require('gulp');
var htmlhint = require('gulp-htmlhint');
var minifyHTML = require('gulp-minify-html');

gulp.task('html', function () {
    var minifyOpts = {
        empty: true,
        conditionals: true,
        spare: true
    };
    return gulp.src('**/*.html')
        .pipe(htmlhint('./config/lint/html/htmlhintrc.json'))
        .pipe(htmlhint.reporter())
        .pipe(minifyHTML(minifyOpts))
        .pipe(gulp.dest());
});
```