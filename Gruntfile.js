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
      dist: {
        options: {
          optimize: 'uglify',
          baseUrl: 'app/src',
          paths: {
            'text': '../lib/require.text'
          },
          name: 'app',
          out: 'app/dist/app.js'
        }
      }
    },

    recess: {
      lint: {
        options: {
          noUniversalSelectors: false
        },
        src: ['app/src/*.css']
      },
      dist: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          'app/dist/app.css': ['app/src/*.css']
        }
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-recess');

  grunt.registerTask('default', ['jshint', 'recess:lint']);
  grunt.registerTask('dist', ['jshint', 'requirejs:dist', 'recess:dist']);

};
