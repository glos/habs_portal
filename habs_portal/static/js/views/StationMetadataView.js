/*
 * habs_portal/static/js/views/StationMetadataView.js
 * View definition for the banner
 *
 * Partials:
 *  - habs_portal/static/js/partials/StationMetadata.html
 */
var StationMetadataView = Backbone.View.extend({
  initialize: function() {
    console.log("Station Metdata View initialized");
    this.initialRender();
  },

  initialRender: function() {
    this.$el.html('<i>Spin wheel normally goes here</i>');
  },

  template: JST['habs_portal/static/js/partials/StationMetadata.html'],

  render: function() {
    this.$el.html(this.template({collection: this.collection}));
  },

  onVariableSelect: function(e) {
    // FIXME.  You may not need to pass along collection.first() here.
    // If you have picked a variable, you should have picked a station 1st.
    app.trigger('stationMetdataView:onVariableSelect',
      this.collection.first(),
      $(e.target).find(':selected').val()
    );
  },

  events: {
    'change select': 'onVariableSelect'
  }
});
