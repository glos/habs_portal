this["JST"] = this["JST"] || {};

this["JST"]["habs_portal/static/js/partials/TestTable.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<table class="table table-bordered">\n  <thead>\n    <tr>\n      <th>\n        Message\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n  ';
 collection.each(function(model) { ;
__p += '\n    <tr>\n      <td> ' +
((__t = ( model.get('message') )) == null ? '' : __t) +
' </td>\n    </tr>\n  ';
 }); ;
__p += '\n  </tbody>\n</table>\n';

}
return __p
};