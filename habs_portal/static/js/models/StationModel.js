/*
 * habs_portal/static/js/models/StationModel.js
 * 
 */

var StationModel = Backbone.Model.extend({
  urlRoot: '/json/stations.json',
  defaults: {
    categories: [],
    name: "",
    lat: null,
    lon: null,
    id: ""
  }
});

var StationCollection = Backbone.Collection.extend({
  url: '/json/stations.json',
  model: StationModel,
  parse: function(response) {
    if(response && response.stations) {
      return response.stations;
    }
    return [];
  }
});
