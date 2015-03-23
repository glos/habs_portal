"use strict";
/*
 * habs_portal/static/js/models/TimeseriesMode.js
 *
 * Model to define the characteristics of the timeseries view
 */
var TimeseriesModel = Backbone.Model.extend({
  urlRoot: '#',
  url: '#',
  defaults: {
    // netCDF URL thing
    dataset: null,
    // a variable in the dataset, contains name, short_name, units etc.
    variable: null,
    // Start and End Dates, must be a javascript Date object
    start: null,
    end: null
  },
});
