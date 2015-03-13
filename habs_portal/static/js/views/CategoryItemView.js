var CategoryItemView = Backbone.View.extend({
  className: "panel panel-default",
  subviews: [],
 
  add: function(subview) {
    subview.render();
    this.subviews.push(subview);
    this.$el.find('.panel-body').append(subview.el);
  },

  template: JST['habs_portal/static/js/partials/CategoryItem.html'],
 
  render: function() {
    var self = this;
    this.$el.html(this.template({model: this.model}));
    this.collection.each(function(model) {
      var subview = new StationItemView({
        model: model
      });
      self.add(subview);
    });
  },

  onCategorySelect: function(e) {
    console.log('onCategorySelect: ' + this.model.get('name'));
  },

  events: {
    'click h4' : 'onCategorySelect' 
  }
});
