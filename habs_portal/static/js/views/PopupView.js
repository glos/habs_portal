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
  initialize: function(options) {
    if(options && options.institution) {
      this.institution = options.institution;
    } else {
      console.error("Institution for " + model.get('name') + " not found!");
    }
  },
  template: JST['habs_portal/static/js/partials/Popup.html'],
  render: function() {
    this.$el.html(this.template({model: this.model, institution: this.institution }));
  }
});

