/*
 * habs_portal/static/js/views/TimeseriesView.js
 * View definition for the banner
 *
 * Partials:
 *  - habs_portal/static/js/partials/Timeseries.html
 */
var TimeseriesView = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, "onEndDateChange", "onStartDateChange");
    if(options && options.datasets) {
      this.datasets = options.datasets;
    } else {
      console.error("TimeseriesView needs a collection of datasets");
    }
    if(! this.model) {
      console.error("TimeseriesView needs a TimeseriesModel defined in the model attribute");
    }
    this.initialRender();
  },

  initialRender: function() {
    this.$el.html('<i>Spin wheel normally goes here</i>');
  },

  template: JST['habs_portal/static/js/partials/Timeseries.html'],

  onStartDateChange: function(e) {
    var startDate = this.$start_date.parent('.date').data("DateTimePicker").getDate();
    this.model.set('start', startDate);
  },

  onEndDateChange: function(e) {
    var endDate = this.$end_date.parent('.date').data("DateTimePicker").getDate();
    this.model.set('end', endDate);
  },

  render: function() {
    var self = this;
    this.$el.html(this.template());
    this.$el.find('.input-group.date').datetimepicker();
    
    /* Everything to do with mangling our time variables */
    /* Our time pickers */
    this.$start_date = this.$el.find('#start-date');
    this.$end_date = this.$el.find('#end-date');
    
    /* String ISO format */
    var startdate = this.model.get('start').toISOString();
    var enddate = this.model.get('end').toISOString();

    if(startdate.indexOf('Z') < 0) {
      startdate += 'Z';
    }
    if(enddate.indexOf('Z') < 0) {
      enddate += 'Z';
    }

    /* The JS version */
    var startdate_js = new Date(startdate);
    var enddate_js = new Date(enddate);

    /* Set the time pickers to the current selected time */
    this.$start_date.parent('.date').data("DateTimePicker").setDate(new Date(startdate_js));
    this.$end_date.parent('.date').data("DateTimePicker").setDate(new Date(enddate_js));

    var width = this.$el.find('#timeseries-plot').width();
    var height = this.$el.find('#timeseries-plot').height();
    var dataset = this.model.get('dataset');
    var variable = this.model.get('variable');

    var svgPlotView = new SVGPlotView({
      width: width,
      height: height,
      url: '/plotting/getplot?' + $.param({
        plottype: 'stats',
        datacat: 'lakes',
        datatype: dataset.get('category_id'),
        id: dataset.get('station_id'),
        variables: variable.name,
        step: 1,
        startdate: startdate,
        enddate: enddate,
        width: width,
        height: height,
        format: 'svg' // REALLY IMPORTANT!
      })
    });
    svgPlotView.fetch();
    this.$el.find('#timeseries-plot').html(svgPlotView.el);
  },

  onRefreshClick: function(e) {
    var startDate = this.$start_date.parent('.date').data("DateTimePicker").getDate();
    var endDate = this.$end_date.parent('.date').data("DateTimePicker").getDate();

    app.trigger('timeseriesView:onRefreshClick', this.model, {start : startDate, end : endDate});
  },

  events: {
    'click #refresh-button' : 'onRefreshClick',
    'change #start-date' : 'onStartDateChange',
    'change #end-date' : 'onEndDateChange'
  }
});
