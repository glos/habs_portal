/*
 * habs_portal/static/js/views/StationMetadataView.js
 * View definition for the banner
 *
 * Partials:
 *  - habs_portal/static/js/partials/StationMetadata.html
 */
var StationMetadataView = Backbone.View.extend({
  initialize: function(options) {
    if(options && options.datasets) {
      this.datasets = options.datasets;
    } else {
      console.error("StationMetadataView requires datasets");
    }
    if(options && options.institutions) {
      this.institutions = options.institutions;
    } else {
      console.error("StationMetadataView requires institutions");
    }
    this.initialRender();
  },

  initialRender: function() {
    this.$el.html('<i>Spin wheel normally goes here</i>');
  },

  template: JST['habs_portal/static/js/partials/StationMetadata.html'],

  render: function() {
    var self = this;
    var variables = [];
    // Build a list of variables using the dataset info
    this.datasets.each(function(dataset) {
      console.log(dataset.get('station_id'));
      if(dataset.get('station_id') == self.model.get('id')) {
        _.each(dataset.get('variables'), function(variable) {
          var varName = variable.long_name + ' (' + variable.units + ')';
          variables.push(varName);
        });
      }
    });
    console.log(this.institutions.pluck('id'));
    console.log(this.model.get('institution'));
    var institution = this.institutions.get(this.model.get('institution'));
    if(!institution) {
      institution = new InstitutionModel();
      console.log("no institution found");
    }
    this.$el.html(this.template({model: this.model, variables: variables, institution: institution}));
  },

  onVariableSelect: function(e) {
    // FIXME.  You may not need to pass along collection.first() here.
    // If you have picked a variable, you should have picked a station 1st.
    app.trigger('stationMetdataView:onVariableSelect',
      this.stations.first(),
      $(e.target).find(':selected').val()
    );
  },

  events: {
    'change select': 'onVariableSelect'
  }
});
