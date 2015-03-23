/*
 * habs_portal/static/js/views/StationMetadataView.js
 * View definition for the banner
 *
 * Partials:
 *  - habs_portal/static/js/partials/StationMetadata.html
 */
var StationMetadataView = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, "onVariableSelect");
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
      // If this dataset belongs to the selected station
      if(dataset.get('station_id') == self.model.get('id')) {
        _.each(dataset.get('variables'), function(variable, idx) {
          var varName = variable.long_name + ' (' + variable.units + ')';
          // An object to store information about the variable and where it comes from
          var varPack = {
            dataset: dataset,
            variable: variable,
            varName: varName
          };
          variables.push(varPack);
        });
      }
    });
    var institution = this.institutions.get(this.model.get('institution'));
    if(!institution) {
      institution = new InstitutionModel();
    }
    this.$el.html(this.template({model: this.model, variables: variables, institution: institution}));
    this.$el.find('#variable-select option').each(function(idx, ele) {
      $(ele).data('variable', variables[idx]);
    });
  },

  onVariableSelect: function(e) {
    app.trigger('stationMetdataView:onVariableSelect',
      this.$el.find('#variable-select option:selected').data('variable')
    );
  },

  events: {
    'change select': 'onVariableSelect'
  }
});
