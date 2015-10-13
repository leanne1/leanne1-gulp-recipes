module.exports = function(config) {
    config.set({

        basePath: '',
        
        browsers: ['PhantomJS'],

        frameworks: ['browserify', 'jasmine'],

        files: [
            'src/test/**/*.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'src/test/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify'],
            paths: [
                './node_modules', 
                './bower_components/'
            ]
        },

        reporters: ['mocha']
    });
};