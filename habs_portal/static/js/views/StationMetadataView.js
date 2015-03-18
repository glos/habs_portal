/*
 * habs_portal/static/js/views/StationMetadataView.js
 * View definition for the banner
 *
 * Partials:
 *  - habs_portal/static/js/partials/StationMetadata.html
 */
var StationMetadataView = Backbone.View.extend({
  initialize: function() {
    console.log("StationMetadata View initialized");
    this.initialRender();
  },
  initialRender: function() {
    this.$el.html('<i>Spin wheel normally goes here</i>');
  },
  template: JST['habs_portal/static/js/partials/StationMetadata.html'],
  render: function() {
    this.$el.html(this.template());
  }
});
