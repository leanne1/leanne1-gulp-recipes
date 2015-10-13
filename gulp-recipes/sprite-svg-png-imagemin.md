# Generate SVG and PNG sprites and associated Less rules

Takes a folder of SVG images as a source. These should be added as actual size dimensions because the PNG sprite is generated from a 1:1 copy of the SVG icons. Create a ```.no-svg``` ruleset to target the PNG background image.

```js
// npm install --save-dev gulp-svg-sprite gulp-svg2png gulp-filter gulp-imagemin del 

var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var svg2png = require('gulp-svg2png');
var filter = require('gulp-filter');
var imagemin = require('gulp-imagemin');
var del = require('del');

gulp.task('sprite', function () {
    var config = {
        mode                : {
            css             : {
                render      : {
                    less    : { 
                        //output dest for less sprite file; relative to main less file
                        dest: '../../../components/lib/sprite/sprite-gulp.less' 
                    },
                    //Directory of output of temporary sprite CSS
                    css     : {
                        dest: '../dist/css/tmp.sprite.css'
                    }
                },
                sprite      : '../dist/img/sprite.svg', 
                //Add cache buster for filename
                bust        : false,
                //Sprite classname prefix
                prefix      : '.sprite-'
            }
        },
        shape               : {
            dimension       : {
                maxWidth    : 100,
                maxHeight   : 100
            },
            spacing         : {
                padding     : 0
            },
        },
    };
    return gulp.src('./icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./path/to/output/relative/to/gulpfile'))
        .pipe(filter('**/*.svg'))
        .pipe(svg2png())
        .pipe(gulp.dest('./path/to/output/relative/to/gulpfile'))
        .pipe(imagemin({
            optimizationLevel: 4
        }))
        .pipe(gulp.dest('./path/to/output/relative/to/gulpfile'))
        ;
});

gulp.task('del-temp', function () {
    //Directory of output of temporary sprite CSS, 
    del('../dist/css/tmp.sprite.css');    
})
```

```css
/* CSS: target PNG sprite to 'no-svg' browsers */

@import "./sprite-gulp.less"; /* Sprite less output */

.no-svg {
    span[class^='sprite-']  {
        background-image: url(../img/sprite.png);
    }
}
span[class^='sprite-'] {
    display: inline-block;
}

```

