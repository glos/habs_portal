/*
 * habs_portal/static/js/views/WindowView.js
 * View definition for the browser window.  This is special because it listens
 * for model changes directly.
 *
 * Models:
 *  - habs_portal/static/js/models/WindowModel.js
 */
var WindowView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.resize);
  },
  resize: function() {
    app.trigger('windowView:resize', this.model);
  }
});
