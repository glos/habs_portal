var CategoryItemView = Backbone.View.extend({
  className: "panel panel-default",
  subviews: [],
  add: function(subview) {
    subview.render();
    this.subviews.push(subview);
    this.$el.find('.panel-body').append(subview.el);
  },
  collapse: function() {
    this.$el.find('.collapse').collapse('toggle');
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
    this.collapse();
  },

  events: {
    'click' : 'onCategorySelect' 
  }
});
