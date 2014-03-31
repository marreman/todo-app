module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      src: ['Gruntfile.js', 'app/src/**/*.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);

};
