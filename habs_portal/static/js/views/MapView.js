"use strict";
/*
 * habs_portal/static/js/views/MapView.js
 * View definition for the Map
 *
 * Partials:
 *  
 */

var MapView = Backbone.View.extend({
    initialize: function(options) {
    var self = this;
    _.bindAll(this, "onEachFeature", "highlight_layer", "reset_highlight");
    var center = [41.505, -80.09];
    var zoom = 3;
    var maxZoom = 18;

    this.featureStyle = {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.85
    };

    if(options && options.center) {
      center = options.center;
    }
    if(options && options.zoom) {
      zoom = options.zoom;
    }
    if(options && options.maxZoom) {
      maxZoom = options.maxZoom;
    }

    this.map = L.map(this.el,{
       center: center,
       zoom: zoom,
       maxZoom: maxZoom
     });
    this.render();
    this.map.on('click', function(event) {
      self.trigger('mapClick', self);
    });
    return this
  },
  addTrajectory: function(feature) {
    L.geoJson(feature, {
        style: this.featureStyle,
        onEachFeature: this.onEachFeature
    }).addTo(this.map);
  },
  onEachFeature: function(feature, layer) {
    var self = this;
    var popupContent = "No Popup Content";
    if (feature.properties && feature.properties.popupContent) {
      popupContent = feature.properties.popupContent;
    }
    layer.bindPopup(popupContent);
    layer.on({
      mouseover: function(e) {
        self.highlight_layer(layer);
      },
      mouseout: function(e) {
        self.reset_highlight(layer);
      }
    });
  },
  highlight_layer: function(layer) {
    if (layer._map != null) {
      layer.setStyle({color: 'red'});
    }
  },
  reset_highlight: function(layer) {
    layer.setStyle(this.featureStyle);
  },
  //renders a simple map view
  render: function() {
      //needs to be set
    L.Icon.Default.imagePath = '/lib/leaflet/dist/images';
   
    var map = this.map;

    var etopo = L.tileLayer('http://maps.ngdc.noaa.gov/arcgis/rest/services/web_mercator/etopo1_hillshade/MapServer/tile/{z}/{y}/{x}',{
      attribution: 'NOAA NGDC ETOPO1'
    });

    var oceansBasemap = L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}.jpg', {
        minZoom: 1,
        maxZoom: 12,
        attribution: 'Sources: Esri, GEBCO, NOAA, National Geographic, DeLorme, HERE, Geonames.org, and other contributors'
    });
    
    
    var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{    
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    var Stamen_TonerHybrid = L.tileLayer('http://{s}.tile.stamen.com/toner-hybrid/{z}/{x}/{y}.png', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20
    });     

    oceansBasemap.addTo(this.map);
    L.control.layers({
      "ESRI OceansBaseMao" : oceansBasemap,
      "NOAA ETOPO" : etopo,
      "ESRI World Imagery" : Esri_WorldImagery
    }).addTo(this.map);

    L.Util.requestAnimFrame(map.invalidateSize,map,!1,map._container);
    return this;
  },
  /*
   * options: 
   *   lat,
   *   lon,
   *   radius, (pixels)
   *   color,
   *   fillColor,
   *   fillOpacity,
   */
  drawCircle: function(options) {
    if(!(options && options.lat && options.lon)) {
      console.error("lat and lon are required options");
      return;
    }

    var lat = options.lat;
    var lon = options.lon;
    var radius = options.radius || 500;

    var opts = {
      radius: 500,
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }
    _.extend(opts, options);

    var circle = L.circleMarker([lat, lon], opts);
    circle.addTo(this.map);
    return circle;
  },
  redraw: function() {
    this.map.invalidateSize();
  }
});

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
        model: feature.model
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
    feature.circle.bindPopup(view.el, {maxWidth: 900}).openPopup();
  },
  selectStation: function(model) {
    var feature = _.find(this.stations, function(station) {
      return station.id == model.id
    });

    if(feature) {
      this.map.removeLayer(feature.circle);
      this.stations.pop(feature);
    }

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
  initialize: function() {
    MapView.prototype.initialize.apply(this, arguments);
  },
  stations: []
});

