/*
 * habs_portal/static/js/models/InstitutionModel.js
 * 
 * Model for the institutions, includes description, image etc.
 */

var InstitutionModel = Backbone.Model.extend({
  urlRoot: '#',
  defaults: {
    "name": "",
    "icon" : ""
  }
});

var InstitutionCollection = Backbone.Collection.extend({
  url: '/json/institutions.json',
  parse: function(response) {
    if(response && response.institutions) {
      return response.institutions;
    }
    return [];
  }
});

