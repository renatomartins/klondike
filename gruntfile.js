module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      compile: {
        options: {
          paths: ['src/less', 'bower_components']
        },
        files: {
          'dist/style.css': 'src/less/index.less'
        }
      }
    },

    copy: {
      html: {
        files: {
          'dist/index.html': 'src/html/index.html'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      less: {
        files: 'src/less/**/*',
        tasks: ['less']
      },
      html: {
        files: 'src/html/**/*',
        tasks: ['copy']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less', 'copy']);
};
