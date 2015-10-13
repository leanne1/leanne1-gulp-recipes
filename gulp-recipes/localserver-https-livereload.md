# Cross-platform HTTPS localhost server

```js
// npm install --save-dev gulp-webserver

var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('serve:dev', function () {
    gulp.src('./path/to/site/root/relative/to/gulpfile')
        .pipe(webserver({
            port: 8181,
            host: '0.0.0.0',
            https: { key: 'key.pem', cert: 'cert.pem' }, //paths to key.pem and cert.pem
            livereload: { enable: true, port: 4444 }
    }));
});
```