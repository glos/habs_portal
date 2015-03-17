/*
 * habs_portal/static/js/models/CategoryModel.js
 * 
 */

var CategoryModel = Backbone.Model.extend({
  defaults: {
    id: "",
    name: ""
  }
});

var CategoryCollection = Backbone.Collection.extend({
  url: '/json/categories.json',
  model: CategoryModel,
  parse: function(response) {
    if(response && response.categories) {
      return response.categories;
    }
    return [];
  },
  customFilter: function(filters){
    var results = this.where(filters);
    return new CategoryCollection(results);
  }
});
