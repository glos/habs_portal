var TOCChildItemView = Backbone.View.extend({
  tagName: 'li',

  template: JST['habs_portal/static/js/partials/TOCChildItem.html'],

  render: function() {
    this.$el.html(this.template({ model: this.model }));
  },

  onTOCChildSelect: function(e) {
    e.preventDefault();
    e.stopPropagation(); // don't wanna toggle
    app.trigger('tocChildItemView:onTOCChildSelect', this.model);
  },

  events: {
    'click' : 'onTOCChildSelect'
  }
});
