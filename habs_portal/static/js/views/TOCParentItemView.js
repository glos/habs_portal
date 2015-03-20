var TOCParentItemView = Backbone.View.extend({
  className: "panel panel-default",
  subviews: [],
  add: function(subview) {
    subview.render();
    this.subviews.push(subview);
    this.$el.find('.panel-body > ul').append(subview.el);
  },
  collapse: function() {
    this.$el.find('.collapse').collapse('toggle');
  },
  template: JST['habs_portal/static/js/partials/TOCParentItem.html'],
 
  render: function() {
    var self = this;
    this.$el.html(this.template({model: this.model, collectionLength: this.collection.length}));
    this.collection.each(function(model) {
      var subview = new TOCChildItemView({
        model: model
      });
      self.add(subview);
    });
  },

  onTOCParentSelect: function(e) {
    console.log('onTOCParentSelect: ' + this.model.get('name'));
    this.collapse();
  },

  events: {
    'click' : 'onTOCParentSelect' 
  }
});
