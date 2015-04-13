'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'images/'
        }, 
        {
          expand: true,
          cwd: 'assets/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'assets/'
        }]
      }
    },
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Register tasks
  grunt.registerTask('default', [
    'imagemin'
  ]);

};