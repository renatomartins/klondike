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

    jst: {
      src: {
        options: {
          namespace: 'Templates',
          templateSettings: {
            interpolate: /\{\{(.+?)\}\}/g
          },
          processName: function (filepath) {
            fileParts = filepath.split('/');
            filename = fileParts[fileParts.length - 1].split('.');
            return filename[0].charAt(0).toUpperCase() + filename[0].substr(1);
          }
        },
        files: {
          'build/templates.js': 'src/html/templates/**/*.html'
        }
      }
    },

    requirejs: {
      src: {
        options: {
          baseUrl: 'src/js',
          include: [
            'jquery',
            'backbone',
            'templates',

            'model/card',
            'view/card',

            'collection/cards',
            'view/cards',

            'view/deck',
            'view/waste',
            'view/foundation',
            'view/pile',

            'app'
          ],
          skipModuleInsertion: true,
          out: 'dist/app.js',
          paths: {
            jquery: '../../bower_components/jquery/dist/jquery.min',
            underscore: '../../bower_components/underscore/underscore-min',
            backbone: '../../bower_components/backbone/backbone',
            templates: '../../build/templates'
          }
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      less: {
        files: 'src/less/**/*.less',
        tasks: ['less']
      },
      html: {
        files: 'src/html/index.html',
        tasks: ['copy']
      },
      jst: {
        files: 'src/html/templates/**/*.html',
        tasks: ['jst', 'requirejs']
      },
      js: {
        files: 'src/js/**/*.js',
        tasks: ['requirejs']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less', 'copy', 'jst', 'requirejs']);
};
