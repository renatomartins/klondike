module.exports = function (grunt) {

  grunt.initConfig({

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
          'build/templates.js': 'src/html/templates/*.html'
        }
      }
    },

    concat: {
      js: {
        options: {
          banner: ';(function(){',
          footer: '}());'
        },
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/underscore/underscore-min.js',
          'bower_components/backbone/backbone.js',
          'bower_components/backbone.localStorage/backbone.localStorage-min.js',
          'build/templates.js',

          'src/js/model/card.js',
          'src/js/model/settings.js',

          'src/js/collection/cards.js',
          'src/js/collection/deck.js',
          'src/js/collection/waste.js',
          'src/js/collection/foundation.js',
          'src/js/collection/pile.js',

          'src/js/view/settings.js',
          'src/js/view/card.js',
          'src/js/view/cards.js',
          'src/js/view/deck.js',
          'src/js/view/waste.js',

          'src/js/app.js'
        ],
        dest: 'dist/app.js',
      },
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
        tasks: ['jst', 'concat']
      },
      js: {
        files: 'src/js/**/*.js',
        tasks: ['concat']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less', 'copy', 'jst', 'concat']);
};
