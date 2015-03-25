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

    this.controlLayers = null;

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

    if(this.controlLayers === null) {
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
      this.controlLayers = L.control.layers({
        "ESRI OceansBaseMao" : oceansBasemap,
        "NOAA ETOPO" : etopo,
        "ESRI World Imagery" : Esri_WorldImagery
      });
      this.controlLayers.addTo(this.map);
    }
    

    L.Util.requestAnimFrame(map.invalidateSize,map,!1,map._container);
    return this;
  },
  /*
   * options: 
   *   lat,
   *   lon,
   *   highlighted
   */
  drawMarker: function(options) {
    if(!(options && options.lat && options.lon)) {
      console.error("lat and lon are required options");
      return;
    }

    var lat = options.lat;
    var lon = options.lon;

    var opts = {
    }
    _.extend(opts, options);

    var marker = L.marker([lat, lon], {icon: L.AwesomeMarkers.icon({
      prefix: 'fa',
      icon: opts.highlighted || opts.selected ? 'fa-circle' : 'fa-circle-o',
      markerColor: opts.highlighted || opts.selected ? 'red' : 'darkblue'
    })});
  
    marker.addTo(this.map);
    return marker;
  },
  redraw: function() {
    this.map.invalidateSize();
  }
});

