# Javascript unit tests with Jasmine and ES6 and commonJS support

Use with supplied ```karma.conf.js``` placed in root of project. Supports commonJs modules and ES6 syntax in both source and test code and using the [Jasmine](http://jasmine.github.io/) javascript unit test framework. Two tasks are included - a 'run then exit' task suitable for C.I servers and a 'run then watch' task suitable for TDD / test development. Runs up tests in PhantomJS and outputs test results to the console.

```js
// npm install --save-dev jasmine-core karma karma-browserify karma-jasmine karma-mocha-reporter karma-phantomjs-launcher phantomjs
 
var Server = require('karma').Server;
   
// C.I. server test task
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

// TDD test task
gulp.task('test:dev', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        autoWatch: true
    }, done).start();
});
```