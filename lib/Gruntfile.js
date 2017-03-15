

module.exports = function(grunt) {

  grunt.initConfig({
    // Change the b-fy task to add a transform task
    jshint: {
      options: {
        predef: ["document", "console", "$", "event", "target", "alert", "XMLHttpRequest", "new", "window", "require", "currentTarget", "firebase", "$scope", "$window", "localStorage"],
        esnext: true,
        globalstrict: true,
        globals: {"angular": true, "$":true, "app": true},
      },
      files: ['../app/**/*.js'],
    },
    watch: {
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['./sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'watch']);
}; 