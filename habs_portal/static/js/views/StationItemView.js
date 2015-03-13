var StationItemView = Backbone.View.extend({
  tagName: 'li',

  template: JST['habs_portal/static/js/partials/StationItem.html'],

  render: function() {
    this.$el.html(this.template({ model: this.model }));
  },

  onStationSelect: function(e) {
    e.preventDefault();
    e.stopPropagation(); // don't wanna toggle
    app.trigger('stationItemView:onStationSelect', this.model);
  },

  events: {
    'click' : 'onStationSelect'
  }
});
