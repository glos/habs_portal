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
  }
});
