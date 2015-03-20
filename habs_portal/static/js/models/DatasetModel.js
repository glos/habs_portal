"use strict";
/*
 * habs_portal/static/js/models/DatasetModel.js
 * Model definitions for Datasets
 */

var DatasetModel = Backbone.Model.extend({
  urlRoot: '/api/dataset',
  defaults: {
    category_id: "",
    station_id: "",
    variables: []
  }
});

var DatasetCollection = Backbone.Collection.extend({
  url: '/api/dataset',
  model: DatasetModel,
  parse: function(response) {
    if(response && response.datasets) {
      return response.datasets;
    }
    return [];
  }
});
