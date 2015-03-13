var StationItemView = Backbone.View.extend({
  tagName: "li",

  template: JST['habs_portal/static/js/partials/StationItem.html'],

  render: function() {
    this.$el.html(this.template({ model: this.model }));
  },

  onStationSelect: function(e) {
    console.log('onStationSelect: ' + this.model.get('id'));
    e.preventDefault();
    e.stopPropagation();
  },

  events: {
    'click a' : 'onStationSelect'
  }
});
