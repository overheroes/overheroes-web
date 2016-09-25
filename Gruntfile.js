module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          yuicompress: true,
          optimization: 2
        },
        files: {
          'public/css/overheroes.css': 'src/less/main.less'
        }
      }
    },
    babel: {
      options: {
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: {
          'public/js/overheroes.js': 'src/js/main.js',
          'public/sw.js': 'src/js/sw.js'
        }
      }
    },
    watch: {
      styles: {
        files: ['src/less/**/*.less', 'src/js/**/*.js'],
        tasks: ['less', 'babel'],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};
