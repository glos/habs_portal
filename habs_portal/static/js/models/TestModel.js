/*
 * habs_portal/static/js/models/TestModel.js
 *
 * Example / Test Model Code using Backbone
 */

var TestModel = Backbone.Model.extend({
  urlRoot: '/api/test',
  defaults: {
    message: ""
  }
});

var TestCollection = Backbone.Collection.extend({
  url: '/api/test',
  model: TestModel,
  parse: function(response) {
    if(response && response.messages) {
      return response.messages;
    }
    return [];
  }
});
