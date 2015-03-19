"use strict";
/*
 * habs_portal/static/js/views/PopupView.js
 * View definition for the Map
 *
 * Partials:
 *  - habs_portal/static/js/partials/Popup.html 
 */

var PopupView = Backbone.View.extend({ 
  className: "popup-view",
  initialize: function(options) {
    var self = this;
    if(options && options.institution) {
      this.institution = options.institution;
    } else {
      console.error("Institution for " + model.get('name') + " not found!");
    }

    this.svgPlotView = new SVGPlotView({
      width: 800,
      height: 300,
      url: '/plotting/getplot?' + $.param({
        plottype: 'multiple_yaxes',
        datacat: 'lakes,lakes',
        datatype: 'temperature,temperature',
        id: 'tollsps,toledo',
        variables: 'temperature,temperature',
        step: 8,
        startdate: '2015-02-01T00:00:00Z',
        enddate: '2015-03-01T00:00:00Z',
        width: 800,
        height: 300,
        format: 'svg' // REALLY IMPORTANT!
      })
    });

    this.svgPlotView.fetch();
    //TODO: Moe this to the main app
  },
  template: JST['habs_portal/static/js/partials/Popup.html'],
  render: function() {
    this.$el.html(this.template({model: this.model, institution: this.institution }));
    this.$el.find('.plot-example').html(this.svgPlotView.el);
  }
});

