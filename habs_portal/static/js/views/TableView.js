/*
 * habs_portal/static/js/views/TableView.js
 * View definition for the banner
 *
 * Partials:
 *  - habs_portal/static/js/partials/Table.html
 */
var TableView = Backbone.View.extend({
  initialize: function() {
    console.log("Table View initialized");
    this.initialRender();
  },
  initialRender: function() {
    this.$el.html('<i>Spin wheel normally goes here</i>');
  },
  template: JST['habs_portal/static/js/partials/Table.html'],
  render: function() {
    this.$el.html(this.template());
    this.$el.find('table').dataTable({
      searching: false,
      paging: false,
      info: false
    });
  }
});
