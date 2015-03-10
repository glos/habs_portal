/*
 * habs_portal/static/js/views/NavbarView.js
 * View definition for the banner
 *
 * Partials:
 *  - habs_portal/static/js/partials/Navbar.html
 */
var NavbarView = Backbone.View.extend({
  initialize: function() {
    console.log("Navbar View initialized");
    this.initialRender();
  },
  initialRender: function() {
    this.$el.html('<i>Spin wheel normally goes here</i>');
  },
  template: JST['habs_portal/static/js/partials/Navbar.html'],
  render: function() {
    this.$el.html(this.template());
  }
});
