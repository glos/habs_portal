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
            "habs_portal/static/js/partials/Navbar.html",
            "habs_portal/static/js/partials/TOC.html",
            "habs_portal/static/js/partials/TOCParentItem.html",
            "habs_portal/static/js/partials/TOCChildItem.html",
            "habs_portal/static/js/partials/Popup.html"
          ],
          "habs_portal/static/js/partials/compiled/stations.js" : [
            "habs_portal/static/js/partials/Banner.html",
            "habs_portal/static/js/partials/Navbar.html",
            "habs_portal/static/js/partials/TOC.html",
            "habs_portal/static/js/partials/TOCParentItem.html",
            "habs_portal/static/js/partials/TOCChildItem.html",
            "habs_portal/static/js/partials/StationMetadata.html",
            "habs_portal/static/js/partials/Timeseries.html",
            "habs_portal/static/js/partials/Popup.html"
          ],
          "habs_portal/static/js/partials/compiled/plotting.js" : [
            "habs_portal/static/js/partials/Banner.html",
            "habs_portal/static/js/partials/Navbar.html",
            "habs_portal/static/js/partials/TOC.html",
            "habs_portal/static/js/partials/TOCParentItem.html",
            "habs_portal/static/js/partials/TOCChildItem.html",
            "habs_portal/static/js/partials/Timeseries.html",
            "habs_portal/static/js/partials/PlotCancelButtons.html"
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
            //'habs_portal/static/lib/jquery-ui/jquery-ui.js',
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
            'habs_portal/static/lib/bootstrap/dist/js/bootstrap.js',
            'habs_portal/static/lib/underscore/underscore.js',
            'habs_portal/static/lib/backbone/backbone.js',
            // Models
            'habs_portal/static/js/models/DatasetModel.js',
            'habs_portal/static/js/models/CategoryModel.js',
            'habs_portal/static/js/models/InstitutionModel.js',
            'habs_portal/static/js/models/StationModel.js',
            // Views
            'habs_portal/static/js/views/BannerView.js',
            'habs_portal/static/js/views/MapView.js',
            'habs_portal/static/js/views/StationMapView.js',
            'habs_portal/static/js/views/NavbarView.js',
            'habs_portal/static/js/views/TOCView.js',
            'habs_portal/static/js/views/TOCParentItemView.js',
            'habs_portal/static/js/views/TOCChildItemView.js',
            'habs_portal/static/js/views/SVGView.js',
            'habs_portal/static/js/views/PopupView.js'
          ],
          'habs_portal/static/js/compiled/stations.js' : [
            // Libs
            'habs_portal/static/lib/jquery/dist/jquery.js',
            'habs_portal/static/lib/bootstrap/dist/js/bootstrap.js',
            'habs_portal/static/lib/moment/moment.js',
            'habs_portal/static/lib/bootstrap3-datetimepicker/src/js/bootstrap-datetimepicker.js',
            'habs_portal/static/lib/underscore/underscore.js',
            'habs_portal/static/lib/backbone/backbone.js',
            // Internal Libs
            'habs_portal/static/js/common/urlParse.js',
            // Models
            'habs_portal/static/js/models/CategoryModel.js',
            'habs_portal/static/js/models/DatasetModel.js',
            'habs_portal/static/js/models/InstitutionModel.js',
            'habs_portal/static/js/models/WindowModel.js',
            'habs_portal/static/js/models/StationModel.js',
            'habs_portal/static/js/models/TimeseriesModel.js',
            // Views
            'habs_portal/static/js/views/BannerView.js',
            'habs_portal/static/js/views/StationView.js',
            'habs_portal/static/js/views/NavbarView.js',
            'habs_portal/static/js/views/TOCView.js',
            'habs_portal/static/js/views/TOCParentItemView.js',
            'habs_portal/static/js/views/TOCChildItemView.js',
            'habs_portal/static/js/views/MapView.js',
            'habs_portal/static/js/views/StationMapView.js',
            'habs_portal/static/js/views/StationMetadataView.js',
            'habs_portal/static/js/views/SVGView.js',
            'habs_portal/static/js/views/TimeseriesView.js',
            'habs_portal/static/js/views/PopupView.js',
            'habs_portal/static/js/views/WindowView.js'
          ],
          'habs_portal/static/js/compiled/plotting.js' : [
            // Libs
            'habs_portal/static/lib/jquery/dist/jquery.js',
            'habs_portal/static/lib/bootstrap/dist/js/bootstrap.js',
            'habs_portal/static/lib/moment/moment.js',
            'habs_portal/static/lib/bootstrap3-datetimepicker/src/js/bootstrap-datetimepicker.js',
            'habs_portal/static/lib/underscore/underscore.js',
            'habs_portal/static/lib/backbone/backbone.js',
            // Models
            'habs_portal/static/js/models/CategoryModel.js',
            'habs_portal/static/js/models/DatasetModel.js',
            'habs_portal/static/js/models/InstitutionModel.js',
            'habs_portal/static/js/models/StationModel.js',
            'habs_portal/static/js/models/TimeseriesModel.js',
            'habs_portal/static/js/models/WindowModel.js',
            // Views
            'habs_portal/static/js/views/BannerView.js',
            'habs_portal/static/js/views/StationView.js',
            'habs_portal/static/js/views/NavbarView.js',
            'habs_portal/static/js/views/TOCView.js',
            'habs_portal/static/js/views/TOCParentItemView.js',
            'habs_portal/static/js/views/TOCChildItemView.js',
            'habs_portal/static/js/views/TimeseriesView.js',
            'habs_portal/static/js/views/PlotCancelButtonsView.js',
            'habs_portal/static/js/views/SVGView.js',
            'habs_portal/static/js/views/WindowView.js'
          ]
        }
      },
      css: {
        files: {
          'habs_portal/static/css/compiled/test.css' : [
          ],
          'habs_portal/static/css/compiled/map.css' : [
            'habs_portal/static/css/common.css',
            'habs_portal/static/css/toc.css',
            'habs_portal/static/css/popup.css'
          ],
          'habs_portal/static/css/compiled/stations.css' : [
            'habs_portal/static/css/common.css',
            'habs_portal/static/css/toc.css',
            'habs_portal/static/css/timeseries.css',
            'habs_portal/static/css/stations.css',
          ],
          'habs_portal/static/css/compiled/plotting.css' : [
            'habs_portal/static/css/common.css',
            'habs_portal/static/css/toc.css',
            'habs_portal/static/css/timeseries.css',
            'habs_portal/static/css/plotting.css'
          ]
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
