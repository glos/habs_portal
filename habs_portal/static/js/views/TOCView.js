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
  categoryCollection: null,
  stationCollection: null,

  initialize: function(options) {
    if (options && options.categoryCollection) {
      this.categoryCollection = options.categoryCollection
    } else {
      this.categoryCollection = null;
    }
    if (options && options.stationCollection) {
      this.stationCollection = options.stationCollection
    } else {
      this.stationCollection = null;
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
    this.$el.find('ul').first().append(subview.el);
  },

  render: function() {
    var self = this;
    this.$el.html(this.template());
    this.categoryCollection.each(function(category) {
      var relevantCollection = new StationCollection();
      var relevantStations = self.stationCollection.filter(function(item) {
        return _.indexOf(item.get('categories'),category.get('id')) >= 0;
      });
      relevantCollection.reset(relevantStations);
      var subview = new CategoryItemView({
        model: category,
        collection: relevantCollection
      });
      self.add(subview);
    });
  }
});
