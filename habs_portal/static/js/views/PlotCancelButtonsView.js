/*
 * habs_portal/static/js/views/PlotCancelButtonsView.js
 * View definition for the banner
 *
 * Partials:
 *  - habs_portal/static/js/partials/PlotCancelButtons.html
 */
var PlotCancelButtonsView = Backbone.View.extend({
  initialize: function() {
    console.log("PlotCancelButtons View initialized");
    this.initialRender();
  },

  initialRender: function() {
    this.$el.html('<i>Spin wheel normally goes here</i>');
  },

  template: JST['habs_portal/static/js/partials/PlotCancelButtons.html'],

  render: function() {
    this.$el.html(this.template());
  },

  onButtonClick: function(e) {
    // FIXME.  Passing along the string is obviously not good enough.  But tis for now.
    // Oh yeah, and no model for you.
    app.trigger('plotCancelButtonsView:onButtonClick', this.model, {dataset: $(e.target).data('dataset')});
  },

  events: {
    'click button' : 'onButtonClick'
  }
});
