# Performance metrics by Google Page Speed Insights

```js
// npm install --save-dev psi

var gulp = require('gulp');
var psi = require('psi');

gulp.task('perf', function () {
   performance('desktop');
   performance('mobile');
});

function performance (strategy) {
    return psi('http://mysite.com', {
        nokey: 'true',
        strategy: strategy,
    }).then(function (data) {
        console.log('PSI ' + strategy + ' score is:', data.score);
        console.log('PSI ' + strategy + ' page stats:', data.pageStats);
    });
}
```