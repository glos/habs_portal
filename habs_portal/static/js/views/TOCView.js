/*
 * habs_portal/static/js/views/TOCView.js
 * View definition for a test
 *
 * Models:
 *  - habs_portal/static/js/models/CategoryModel.js
 *  - habs_portal/static/js/models/StationModel.js
 * Partials:
 *  - habs_portal/static/js/partials/TOC.html
 */
var TOCView = Backbone.View.extend({
  subviews : [],
  parentCollection: null,
  childCollection: null,

  initialize: function(options) {
    if (options && options.parentCollection) {
      this.parentCollection = options.parentCollection
    } else {
      this.parentCollection = null;
    }
    if (options && options.childCollection) {
      this.childCollection = options.childCollection
    } else {
      this.childCollection = null;
    }
    if (options && options.parentChildAssociation) {
      this.parentChildAssociation = options.parentChildAssociation
    } else {
      this.parentChildAssociation = true;
    }
    
    console.log("TOC View initialized");
    this.initialRender();
  },

  initialRender: function() {
    this.$el.html('<i>Spin wheel normally goes here</i>');
  },

  template: JST['habs_portal/static/js/partials/TOC.html'],

  add: function(subview) {
    subview.render();
    this.subviews.push(subview);
    this.$el.find('.panel-group').append(subview.el);
  },

  render: function() {
    var self = this;
    this.$el.html(this.template());
    this.parentCollection.each(function(parent) {
      // create an empty collection based on an empty child
      var relevantCollection = new Backbone.Collection(self.childCollection.filter(false));
      var relevantChildren = self.childCollection.filter(function(item) {
        return self.parentChildAssociation(parent,item);
      });
      relevantCollection.reset(relevantChildren);
      var subview = new TOCParentItemView({
        model: parent,
        collection: relevantCollection
      });
      self.add(subview);
    });
  }
});
