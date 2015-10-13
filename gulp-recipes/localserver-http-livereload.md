# Cross-platform HTTP localhost server

```js
// npm install --save-dev gulp-connect 

var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('serve:dev', function() {
    connect.server({
        root: './foo/',
        port: 8181,
        livereload: true
    });
});
```