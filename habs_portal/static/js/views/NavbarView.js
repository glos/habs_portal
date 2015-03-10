/*
 * habs_portal/static/js/views/NavbarView.js
 * View definition for the banner
 *
 * Partials:
 *  - habs_portal/static/js/partials/Navbar.html
 */
var NavbarView = Backbone.View.extend({
  initialize: function(options) {
    if (options && options.mode) {
      this.mode = options.mode
    } else {
      this.mode = null; // better than an udefined, don't you think?
    }
    console.log("Navbar View initialized");
    this.initialRender();
  },
  initialRender: function() {
    this.$el.html('<i>Spin wheel normally goes here</i>');
  },
  template: JST['habs_portal/static/js/partials/Navbar.html'],
  render: function() {
    this.$el.html(this.template());

    // highlight the mode
    this.$el.find('#' + this.mode)
      .append('<span class="sr-only">(current)</span>')
      .parent().toggleClass('active');
  }
});
