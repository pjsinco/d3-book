module.exports = function(grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-php');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({

    php: {
      dev: {
        options: {
          keepalive: true,
          open: true,
          port: 8085
        } 
      }
    },

//    watch: {
//
//      scripts: {
//        files: ['js/**/*.js'],
//        tasks: [ 'jshint' ],
//        options: {
//          livereload: true
//        }
//      }
//    }
    

  }); // initConfig

  //grunt.registerTask('default', ['php', 'watch']);
  grunt.registerTask('default', ['php']);

}; // exports
