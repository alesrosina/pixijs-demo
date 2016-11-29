module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dev: {
        options: {
          bundleExec: true,
          style: 'expanded',
          loadPath: ['node_modules', 'sass'],
          lineNumbers: true
        },
        files: [{
          bundleExec: true,
          expand: true,
          cwd: 'assets/sass',
          src: ['*.sass', '*.scss'],
          dest: 'assets/dist/css',
          ext: '.css'
        }]
      }
    },
    concat: {
      options: {
        separator: ';\r\n'
      },
      dist: {
        src: [
          'node_modules/pixi.js/dist/pixi.min.js',
          'node_modules/pixi-tween/build/pixi-tween.js',
          'assets/js/init.js',
          'assets/js/triangleInit.js',
          'assets/js/triangleSimple.js',
          'assets/js/functions.js'
        ],
        dest: 'assets/dist/js/app.js'
      }
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({browsers: ['> 5%', 'last 3 versions', 'Firefox > 20', 'Opera > 12.1', 'ie > 9']}),
          require('cssnano')()
        ]
      },
      dist: {
        src: ['css/*.css', '!css/*.min.css'],
        dest: 'css/style.min.css'
      }
    },
    watch: {
      styles: {
        files: ['assets/sass/**/*.{sass,scss}', 'assets/js/**/*.js'],
        tasks: ['sass:dev', 'concat'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dev', ['sass:dev', 'concat']);
  grunt.registerTask('prod', ['sass:dev', 'postcss']);

  grunt.registerTask('default', ['dev']);
};