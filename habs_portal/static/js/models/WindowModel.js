/*
 * habs_portal/static/js/models/WindowModel.js
 *
 * Model for the window's width and height.
 */

var WindowModel = Backbone.Model.extend({
  initialize: function() {
    this.set_size();
    this.listenTo(window, 'resize', _.debounce(this.set_size));
  },

  set_size: function() {
    this.set({
      width: $(window).width(),
      height: $(window).height()
    });
  }
});
