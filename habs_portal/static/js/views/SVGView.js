"use strict";
/*
 * habs_portal/static/js/views/SVGView.js
 */
var SVGView = Backbone.View.extend({
  initialize: function(options) {
    if(options && options.height && options.width) {
      this.height = options.height;
      this.width = options.width;
    } else {
      console.error("SVGView needs height and width");
    }
    this.initialRender();
  },
  fetch: function() {
    var self = this;
    console.log("Fetching");
    console.log(this.url);
    this.initialRender();
    $.ajax({
      url: this.url,
      type: 'GET',
      dataType: 'xml',
      success: function(svgDoc) {
        console.log("I WAS CALLED");
        var importedSVGRootElement = document.importNode(svgDoc.documentElement,true);
        self.$el.html(importedSVGRootElement);
        self.render();
        self.trigger("reset");
      },
      error: function(jqXHR, textStatus, error) {
        console.log(jqXHR);
        console.error(textStatus);
        console.error(error);
      }
    });
  },
  initialRender: function() {
    console.log("Plot should be a spinner");
    this.$el.html('<i class="fa fa-spinner fa-spin" style="margin-left:50%;font-size:90px;"> </i>');
  },
  render: function() {
  }
});

var SVGPlotView = SVGView.extend({
  initialize: function(options) {
    if(options && options.url) {
      this.url = options.url;
    }
    SVGView.prototype.initialize.apply(this, arguments);
  },
});

