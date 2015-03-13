"use strict";
/*
 * habs_portal/static/js/views/PopupView.js
 * View definition for the Map
 *
 * Partials:
 *  - habs_portal/static/js/partials/Popup.html 
 */

var PopupView = Backbone.View.extend({ 
  className: "popup-view",
  template: JST['habs_portal/static/js/partials/Popup.html'],
  render: function() {
    this.$el.html(this.template({model: this.model}));
  }
});

