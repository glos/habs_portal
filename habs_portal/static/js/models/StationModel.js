/*
 * habs_portal/static/js/models/StationModel.js
 * 
 */

var StationModel = Backbone.Model.extend({
  urlRoot: '/api/test',
  defaults: {
    message: ""
  }
});

var StationCollection = Backbone.Collection.extend({
  url: '/api/test',
  model: StationModel,
  parse: function(response) {
    if(response && response.messages) {
      return response.messages;
    }
    return [];
  }
});
