module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      src: {
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

    requirejs: {
      src: {
        options: {
          baseUrl: 'src/js',
          optimize: 'none',
          include: [
            'jquery',
            'backbone',
            'model/card',
            'view/card',
            'app'
          ],
          skipModuleInsertion: true,
          out: 'dist/app.js',
          paths: {
            jquery: '../../bower_components/jquery/dist/jquery.min',
            underscore: '../../bower_components/underscore/underscore-min',
            backbone: '../../bower_components/backbone/backbone'
          }
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
      },
      js: {
        files: 'src/js/**/*',
        tasks: ['requirejs']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less', 'copy', 'requirejs']);
};
