module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      src: ['Gruntfile.js', 'app/src/**/*.js']
    },

    requirejs: {
      build: {
        options: {
          baseUrl: 'app/src',
          paths: {
            'text': '../lib/require.text'
          },
          name: 'app',
          out: 'app/dist/app.min.js'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('dist', ['jshint', 'requirejs']);

};
