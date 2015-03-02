/*
 * habs_portal/static/js/views/TestTableView.js
 * View definition for a test
 *
 * Models:
 *  - habs_portal/static/js/models/TestModel.js
 * Partials:
 *  - habs_portal/static/js/partials/TestTable.html
 */
var TestTableView = Backbone.View.extend({
  initialize: function() {
    console.log("Test Table View initialized");
    this.initialRender();
  },
  initialRender: function() {
    this.$el.html('<i>Spin wheel normally goes here</i>');
  },
  template: JST['habs_portal/static/js/partials/TestTable.html'],
  render: function() {
    this.$el.html(this.template({collection: this.collection}));
  }
});
