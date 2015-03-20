/*
 * habs_portal/static/js/views/TimeseriesView.js
 * View definition for the banner
 *
 * Partials:
 *  - habs_portal/static/js/partials/Timeseries.html
 */
var TimeseriesView = Backbone.View.extend({
  initialize: function() {
    console.log("Timeseries View initialized");
    this.initialRender();
  },

  initialRender: function() {
    this.$el.html('<i>Spin wheel normally goes here</i>');
  },

  template: JST['habs_portal/static/js/partials/Timeseries.html'],

  render: function() {
    this.$el.html(this.template());
    this.$el.find('.input-group.date').datetimepicker();

    var svgPlotView = new SVGPlotView({
      width: this.$el.find('#timeseries-plot').width(),
      height: this.$el.find('#timeseries-plot').height(),
      url: '/plotting/getplot?' + $.param({
        plottype: 'stats',
        datacat: 'lakes',
        datatype: 'temperature',
        id: 'tollsps',
        variables: 'temperature',
        step: 1,
        startdate: '2015-02-01T00:00:00Z',
        enddate: '2015-03-01T00:00:00Z',
        width: 800,
        height: 300,
        format: 'svg' // REALLY IMPORTANT!
      })
    });
    svgPlotView.fetch();
    this.$el.find('#timeseries-plot').html(svgPlotView.el);
  },

  onRefreshClick: function(e) {
    app.trigger('timeseriesView:onRefreshClick', this.model, {start : $('#start-date').val(), end : $('#end-date').val()});
  },

  events: {
    'click #refresh-button' : 'onRefreshClick'
  }
});
