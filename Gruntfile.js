
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
                src: ['public/javascripts/partials/**.html'],
                dest: 'public/javascripts/partials/templates.js'
            }
        }
    });

    grunt.registerTask('default', [
        'html2js'
    ]);
};
