module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jst: {
      compile: {
        files: {
          "habs_portal/static/js/partials/compiled/test.js" : [
            "habs_portal/static/js/partials/TestTable.html"
          ],
          "habs_portal/static/js/partials/compiled/map.js" : [
            "habs_portal/static/js/partials/Banner.html",
            "habs_portal/static/js/partials/Navbar.html"
          ]
        }
      }
    },
    concat: {
      js: {
        options: {
          banner: "'use strict';\n",
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          },
        },
        files: {
          'habs_portal/static/js/compiled/test.js' : [
            // Libs
            'habs_portal/static/lib/jquery/dist/jquery.js',
            'habs_portal/static/lib/jquery-ui/jquery-ui.js',
            'habs_portal/static/lib/bootstrap/dist/bootstrap.js',
            'habs_portal/static/lib/underscore/underscore.js',
            'habs_portal/static/lib/backbone/backbone.js',
            // Models
            'habs_portal/static/js/models/TestModel.js',
            // Views
            'habs_portal/static/js/views/TestTableView.js'
          ],
          'habs_portal/static/js/compiled/map.js' : [
            // Libs
            'habs_portal/static/lib/jquery/dist/jquery.js',
            'habs_portal/static/lib/jquery-ui/jquery-ui.js',
            'habs_portal/static/lib/bootstrap/dist/bootstrap.js',
            'habs_portal/static/lib/underscore/underscore.js',
            'habs_portal/static/lib/backbone/backbone.js',
            // Models
            'habs_portal/static/js/models/StationModel.js',
            // Views
            'habs_portal/static/js/views/BannerView.js',
            'habs_portal/static/js/views/NavbarView.js'
          ],
        }
      },
      css: {
        files: {
          'habs_portal/static/css/compiled/test.css' : [
          ],
          'habs_portal/static/css/compiled/map.css' : [
            'habs_portal/static/css/common.css'
          ],
        }
      }
    },
    watch: {
      partials: {
        files: ['**/partials/*.html'],
        tasks: ['jst'],
        options: {
        }
      },
      scripts: {
        files: ['**/views/*.js', '**/models/*.js', '**/css/*.css'],
        tasks: ['concat'],
        options: {
        }
      }
    }
  })

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jst', 'concat']);
  // Empty Commnet
};
