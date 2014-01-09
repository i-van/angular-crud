
module.exports = function(grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        html2js: {
            partials: {
                options: {
                    module: 'app.templates',
                    base: 'public',
                    rename: function (moduleName) {
                        return '/' + moduleName;
                    },
                    htmlmin: {
                        collapseWhitespace: true
                    }
                },
                src: ['public/javascripts/app/templates/**.html'],
                dest: 'public/javascripts/app/templates/build.js'
            }
        }
    });

    grunt.registerTask('default', [
        'html2js'
    ]);
};
