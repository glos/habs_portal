/*
 * habs_portal/static/js/models/CategoryModel.js
 * 
 */

var CategoryModel = Backbone.Model.extend({
  urlRoot: '/json/categories.json',
  defaults: {
    message: ""
  }
});

var CategoryCollection = Backbone.Collection.extend({
  url: '/json/categories.json',
  model: CategoryModel,
  parse: function(response) {
    if(response && response.messages) {
      return response.messages;
    }
    return [];
  }
});

