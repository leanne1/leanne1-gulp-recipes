module.exports = function(config) {
    config.set({

        basePath: '',
        
        browsers: ['PhantomJS'],

        frameworks: ['browserify', 'jasmine'],

        files: [
            'test/**/*.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'test/**/*.js': ['browserify']
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