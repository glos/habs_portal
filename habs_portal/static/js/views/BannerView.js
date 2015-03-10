/*
 * habs_portal/static/js/views/BannerView.js
 * View definition for the banner
 *
 * Partials:
 *  - habs_portal/static/js/partials/Banner.html
 */
var BannerView = Backbone.View.extend({
  initialize: function() {
    console.log("Banner View initialized");
    this.initialRender();
  },
  initialRender: function() {
    this.$el.html('<i>Spin wheel normally goes here</i>');
  },
  template: JST['habs_portal/static/js/partials/Banner.html'],
  render: function() {
    this.$el.html(this.template());
  }
});
