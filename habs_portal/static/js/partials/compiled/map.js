this["JST"] = this["JST"] || {};

this["JST"]["habs_portal/static/js/partials/Banner.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1>Great Lakes Observing System</h1>\n';

}
return __p
};

this["JST"]["habs_portal/static/js/partials/Navbar.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav class="navbar navbar-default">\n  <div class="container-fluid">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class="navbar-header">\n      <a class="navbar-brand" href="#">GLOS</a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n      <ul class="nav navbar-nav">\n        <li><a id="map" href="#">Map</a></li>\n        <li><a id="stations" href="#">Stations</a></li>\n        <li><a id="plotting" href="#">Plotting</a></li>\n      </ul> <!-- .nav .navbar-nav -->\n      <ul class="nav navbar-nav navbar-right">\n        <li><a id="about" href="#">About</a></li>\n        <li><a id="help" href="#">Help</a></li>\n      </ul> <!-- .nav .navbar-nav -->\n    </div><!-- /.navbar-collapse -->\n  </div><!-- /.container-fluid -->\n</nav>\n';

}
return __p
};

this["JST"]["habs_portal/static/js/partials/TOC.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"></div>\n';

}
return __p
};

this["JST"]["habs_portal/static/js/partials/CategoryItem.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="panel-heading" role="tab" id="heading' +
((__t = ( model.get('name') )) == null ? '' : __t) +
'">\n  <h4 class="panel-title">\n    <a data-toggle="collapse" data-parent="#accordion" href="#collapse' +
((__t = ( model.get('name') )) == null ? '' : __t) +
'" aria-expanded="false" aria-controls="collapse' +
((__t = ( model.get('name') )) == null ? '' : __t) +
'">\n      ' +
((__t = ( model.get('name') )) == null ? '' : __t) +
'\n    </a>\n  </h4>\n</div>\n<div id="collapse' +
((__t = ( model.get('name') )) == null ? '' : __t) +
'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' +
((__t = ( model.get('name') )) == null ? '' : __t) +
'">\n  <div class="panel-body">\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["habs_portal/static/js/partials/StationItem.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="#">' +
((__t = ( model.get('id') )) == null ? '' : __t) +
'</a>\n';

}
return __p
};