var CategoryItemView = Backbone.View.extend({
  tagName: "li",
  subviews: [],
 
  add: function(subview) {
    subview.render();
    this.subviews.push(subview);
    this.$el.find('ul').append(subview.el);
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

  onClick: function(e) {
    console.log('Category click: ' + this.model.get('name'));
    e.preventDefault();
    e.stopPropagation();
  },

  events: {
    'click a' : 'onClick' 
  }
});
