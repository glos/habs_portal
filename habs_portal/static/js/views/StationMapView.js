"use strict";
/*
 * habs_portal/static/js/views/StationMapView.js
 * View definition for a Station oriented Map
 *
 * Partials:
 *  
 */

var StationMapView = MapView.extend({
  /*
   * Add a station model to the map by creating a circle for it. Also add it to
   * a list of features so we can bind to it and play with the events.
   */
  addStation: function(model, options) {
    var self = this;
    var opts = {
      lat: model.get('lat'),
      lon: model.get('lon'),
      color: '#A1865B',
      fillColor: '#EED8B6',
      selected: false,
      radius: 10
    };
    _.extend(opts, options);

    var feature = {
      id: model.get('id'),
      model: model,
      selected: opts.selected,
      popupView: null,
      circle: this.drawCircle(opts)
    };
    this.stations.push(feature);
    feature.circle.on('click', function(event) {
      self.trigger('stationClick', feature);
    });
    if(opts.selected) {
      var view = new PopupView({
        model: feature.model,
        institution: this.institutions.findWhere({id: feature.model.get('institution')})
      });
      view.render();
      this.showPopup(model, view);
    }
  },
  showPopup: function(model, view) {
    var feature = _.find(this.stations, function(station) {
      return station.id == model.id
    });
    feature.popupView = view;
    var popup = feature.circle.bindPopup(view.el, {maxWidth:900});
    popup.openPopup();
    //feature.circle.bindPopup(view.el, {maxWidth: 900}).openPopup();
  },
  selectStation: function(model) {
    // First thing to do is clear any current selections
    this.clearSelection();

    // Get the feature for this station
    var feature = _.find(this.stations, function(station) {
      return station.id == model.id
    });

    // If it's found prune it from the this.stations list and remove it from the map
    if(feature) {
      this.map.removeLayer(feature.circle);
      this.stations = _.without(this.stations, feature);
    }

    // Add it back in with the color changes
    this.addStation(model, {
      color: '#F26D64',
      fillColor: '#AD4E47',
      selected: true
    });
  },
  clearSelection: function() {
    var self = this;
    var selectedFeatures = _.where(this.stations, {selected: true});
    _.each(selectedFeatures, function(feature) {
      self.map.removeLayer(feature.circle);
      self.stations.pop(feature);

      self.addStation(feature.model);
    });
  },
  drawStations: function() {
    var self = this;
    this.collection.each(function(model) {
      self.addStation(model);
    });
  },
  initialize: function(options) {
    // Get the institution list from the app, or initialize it ourselves
    if(options && options.institutions) {
      this.institutions = options.institutions;
    } else {
      this.institutions = new InstitutionCollection();
      this.institutions.fetch({reset: true}); // warning asynchronous
    }
    MapView.prototype.initialize.apply(this, arguments);
  },
  stations: []
});

