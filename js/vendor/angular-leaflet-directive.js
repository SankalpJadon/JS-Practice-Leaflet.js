/**!
 * The MIT License
 *
 * Copyright (c) 2013 the angular-leaflet-directive Team, http://tombatossals.github.io/angular-leaflet-directive
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * angular-leaflet-directive
 * https://github.com/tombatossals/angular-leaflet-directive
 *
 * @authors https://github.com/tombatossals/angular-leaflet-directive/graphs/contributors
 */

/*! angular-leaflet-directive 25-01-2015 */ !function(){"use strict";angular.module("leaflet-directive",[]).directive("l
eaflet",["$q","leafletData","leafletMapDefaults","leafletHelpers","leafletEvents",function(a,b,c,d,e){var f;return{restr
ict:"EA",replace:!0,scope:{center:"=",defaults:"=",maxbounds:"=",bounds:"=",markers:"=",legend:"=",geojson:"=",paths:"="
,tiles:"=",layers:"=",controls:"=",decorations:"=",eventBroadcast:"="},transclude:!0,template:'<div class="angular-
leaflet-map"><div ng-transclude></div></div>',controller:["$scope",function(b){f=a.defer(),this.getMap=function(){return
f.promise},this.getLeafletScope=function(){return b}}],link:function(a,g,h){function
i(){isNaN(h.width)?g.css("width",h.width):g.css("width",h.width+"px")}function
j(){isNaN(h.height)?g.css("height",h.height):g.css("height",h.height+"px")}var k=d.isDefined,l=c.setDefaults(a.defaults,
h.id),m=e.genDispatchMapEvent,n=e.getAvailableMapEvents();k(h.width)&&(i(),a.$watch(function(){return
g[0].getAttribute("width")},function(){i(),o.invalidateSize()})),k(h.height)&&(j(),a.$watch(function(){return
g[0].getAttribute("height")},function(){j(),o.invalidateSize()}));var o=new L.Map(g[0],c.getMapCreationDefaults(h.id));i
f(f.resolve(o),k(h.center)||o.setView([l.center.lat,l.center.lng],l.center.zoom),!k(h.tiles)&&!k(h.layers)){var p=L.tile
Layer(l.tileLayer,l.tileLayerOptions);p.addTo(o),b.setTiles(p,h.id)}if(k(o.zoomControl)&&k(l.zoomControlPosition)&&o.zoo
mControl.setPosition(l.zoomControlPosition),k(o.zoomControl)&&l.zoomControl===!1&&o.zoomControl.removeFrom(o),k(o.zoomsl
iderControl)&&k(l.zoomsliderControl)&&l.zoomsliderControl===!1&&o.zoomsliderControl.removeFrom(o),!k(h.eventBroadcast))f
or(var q="broadcast",r=0;r<n.length;r++){var s=n[r];o.on(s,m(a,s,q),{eventName:s})}o.whenReady(function(){b.setMap(o,h.i
d)}),a.$on("$destroy",function(){o.remove(),b.unresolveMap(h.id)}),a.$on("invalidateSize",function(){o.invalidateSize()}
)}}}]),angular.module("leaflet-directive").directive("center",["$log","$q","$location","$timeout","leafletMapDefaults","
leafletHelpers","leafletBoundsHelpers","leafletEvents",function(a,b,c,d,e,f,g,h){var i,j=f.isDefined,k=f.isNumber,l=f.is
SameCenterOnMap,m=f.safeApply,n=f.isValidCenter,o=g.isValidBounds,p=f.isUndefinedOrEmpty,q=function(a,b){return j(a)&&o(
a)&&p(b)};return{restrict:"A",scope:!1,replace:!1,require:"leaflet",controller:function(){i=b.defer(),this.getCenter=fun
ction(){return i.promise}},link:function(b,f,o,p){var r=p.getLeafletScope(),s=r.center;p.getMap().then(function(f){var
p=e.getDefaults(o.id);if(-1!==o.center.search("-"))return a.error('The "center" variable can\'t use a "-" on his key
name: "'+o.center+'".'),void f.setView([p.center.lat,p.center.lng],p.center.zoom);if(q(r.bounds,s))f.fitBounds(g.createL
eafletBounds(r.bounds)),s=f.getCenter(),m(r,function(a){a.center={lat:f.getCenter().lat,lng:f.getCenter().lng,zoom:f.get
Zoom(),autoDiscover:!1}}),m(r,function(a){var b=f.getBounds();a.bounds={northEast:{lat:b._northEast.lat,lng:b._northEast
.lng},southWest:{lat:b._southWest.lat,lng:b._southWest.lng}}});else{if(!j(s))return a.error('The "center" property is
not defined in the main scope'),void
f.setView([p.center.lat,p.center.lng],p.center.zoom);j(s.lat)&&j(s.lng)||j(s.autoDiscover)||angular.copy(p.center,s)}var
t,u;if("yes"===o.urlHashCenter){var v=function(){var a,b=c.search();if(j(b.c)){var
d=b.c.split(":");3===d.length&&(a={lat:parseFloat(d[0]),lng:parseFloat(d[1]),zoom:parseInt(d[2],10)})}return
a};t=v(),r.$on("$locationChangeSuccess",function(a){var b=a.currentScope,c=v();j(c)&&!l(c,f)&&(b.center={lat:c.lat,lng:c
.lng,zoom:c.zoom})})}r.$watch("center",function(b){return j(t)&&(angular.copy(t,b),t=void
0),n(b)||b.autoDiscover===!0?b.autoDiscover===!0?(k(b.zoom)||f.setView([p.center.lat,p.center.lng],p.center.zoom),void f
.locate(k(b.zoom)&&b.zoom>p.center.zoom?{setView:!0,maxZoom:b.zoom}:j(p.maxZoom)?{setView:!0,maxZoom:p.maxZoom}:{setView
:!0})):void(u&&l(b,f)||(r.settingCenterFromScope=!0,f.setView([b.lat,b.lng],b.zoom),h.notifyCenterChangedToBounds(r,f),d
(function(){r.settingCenterFromScope=!1}))):void a.warn("[AngularJS - Leaflet] invalid 'center'")},!0),f.whenReady(funct
ion(){u=!0}),f.on("moveend",function(){i.resolve(),h.notifyCenterUrlHashChanged(r,f,o,c.search()),l(s,f)||b.settingCente
rFromScope||m(r,function(a){r.settingCenterFromScope||(a.center={lat:f.getCenter().lat,lng:f.getCenter().lng,zoom:f.getZ
oom(),autoDiscover:!1}),h.notifyCenterChangedToBounds(r,f)})}),s.autoDiscover===!0&&f.on("locationerror",function(){a.wa
rn("[AngularJS - Leaflet] The Geolocation API is unauthorized on this page."),n(s)?(f.setView([s.lat,s.lng],s.zoom),h.no
tifyCenterChangedToBounds(r,f)):(f.setView([p.center.lat,p.center.lng],p.center.zoom),h.notifyCenterChangedToBounds(r,f)
)})})}}}]),angular.module("leaflet-directive").directive("tiles",["$log","leafletData","leafletMapDefaults","leafletHelp
ers",function(a,b,c,d){return{restrict:"A",scope:!1,replace:!1,require:"leaflet",link:function(e,f,g,h){var
i=d.isDefined,j=h.getLeafletScope(),k=j.tiles;return i(k)||i(k.url)?void h.getMap().then(function(a){var
d,e=c.getDefaults(g.id);j.$watch("tiles",function(c){var f=e.tileLayerOptions,h=e.tileLayer;return!i(c.url)&&i(d)?void a
.removeLayer(d):i(d)?i(c.url)&&i(c.options)&&!angular.equals(c.options,f)?(a.removeLayer(d),f=e.tileLayerOptions,angular
.copy(c.options,f),h=c.url,d=L.tileLayer(h,f),d.addTo(a),void b.setTiles(d,g.id)):void(i(c.url)&&d.setUrl(c.url)):(i(c.o
ptions)&&angular.copy(c.options,f),i(c.url)&&(h=c.url),d=L.tileLayer(h,f),d.addTo(a),void
b.setTiles(d,g.id))},!0)}):void a.warn("[AngularJS - Leaflet] The 'tiles' definition doesn't have the 'url'
property.")}}}]),angular.module("leaflet-directive").directive("legend",["$log","$http","leafletHelpers","leafletLegendH
elpers",function(a,b,c,d){return{restrict:"A",scope:!1,replace:!1,require:"leaflet",link:function(e,f,g,h){var i,j,k,l,m
=c.isArray,n=c.isDefined,o=c.isFunction,p=h.getLeafletScope(),q=p.legend;p.$watch("legend",function(a){n(a)&&(i=a.legend
Class?a.legendClass:"legend",j=a.position||"bottomright",l=a.type||"arcgis")},!0),h.getMap().then(function(c){p.$watch("
legend",function(b){return
n(b)?n(b.url)||"arcgis"!==l||m(b.colors)&&m(b.labels)&&b.colors.length===b.labels.length?n(b.url)?void
a.info("[AngularJS - Leaflet] loading legend service."):(n(k)&&(k.removeFrom(c),k=null),k=L.control({position:j}),"arcgi
s"===l&&(k.onAdd=d.getOnAddArrayLegend(b,i)),void k.addTo(c)):void a.warn("[AngularJS - Leaflet] legend.colors and
legend.labels must be set."):void(n(k)&&(k.removeFrom(c),k=null))}),p.$watch("legend.url",function(e){n(e)&&b.get(e).suc
cess(function(a){n(k)?d.updateLegend(k.getContainer(),a,l,e):(k=L.control({position:j}),k.onAdd=d.getOnAddLegend(a,i,l,e
),k.addTo(c)),n(q.loadedData)&&o(q.loadedData)&&q.loadedData()}).error(function(){a.warn("[AngularJS - Leaflet]
legend.url not loaded.")})})})}}}]),angular.module("leaflet-directive").directive("geojson",["$log","$rootScope","leafle
tData","leafletHelpers",function(a,b,c,d){return{restrict:"A",scope:!1,replace:!1,require:"leaflet",link:function(a,e,f,
g){var h=d.safeApply,i=d.isDefined,j=g.getLeafletScope(),k={};g.getMap().then(function(a){j.$watchCollection("geojson",f
unction(e){if(i(k)&&a.hasLayer(k)&&a.removeLayer(k),i(e)&&i(e.data)){var g,l=e.resetStyleOnMouseout;g=angular.isFunction
(e.onEachFeature)?e.onEachFeature:function(a,c){d.LabelPlugin.isLoaded()&&i(e.label)&&c.bindLabel(a.properties.descripti
on),c.on({mouseover:function(c){h(j,function(){b.$broadcast("leafletDirectiveMap.geojsonMouseover",a,c)})},mouseout:func
tion(a){l&&k.resetStyle(a.target),h(j,function(){b.$broadcast("leafletDirectiveMap.geojsonMouseout",a)})},click:function
(c){h(j,function(){b.$broadcast("leafletDirectiveMap.geojsonClick",a,c)})}})},i(e.options)||(e.options={style:e.style,fi
lter:e.filter,onEachFeature:g,pointToLayer:e.pointToLayer}),k=L.geoJson(e.data,e.options),c.setGeoJSON(k,f.id),k.addTo(a
)}})})}}}]),angular.module("leaflet-directive").directive("layers",["$log","$q","leafletData","leafletHelpers","leafletL
ayerHelpers","leafletControlHelpers",function(a,b,c,d,e,f){return{restrict:"A",scope:!1,replace:!1,require:"leaflet",con
troller:["$scope",function(a){a._leafletLayers=b.defer(),this.getLayers=function(){return
a._leafletLayers.promise}}],link:function(a,b,g,h){var i=d.isDefined,j={},k=h.getLeafletScope(),l=k.layers,m=e.createLay
er,n=f.updateLayersControl,o=!1;h.getMap().then(function(b){a._leafletLayers.resolve(j),c.setLayers(j,g.id),j.baselayers
={},j.overlays={};var d=g.id,e=!1;for(var f in l.baselayers){var
h=m(l.baselayers[f]);i(h)?(j.baselayers[f]=h,l.baselayers[f].top===!0&&(b.addLayer(j.baselayers[f]),e=!0)):delete
l.baselayers[f]}!e&&Object.keys(j.baselayers).length>0&&b.addLayer(j.baselayers[Object.keys(l.baselayers)[0]]);for(f in
l.overlays){"cartodb"===l.overlays[f].type;var
p=m(l.overlays[f]);i(p)?(j.overlays[f]=p,l.overlays[f].visible===!0&&b.addLayer(j.overlays[f])):delete
l.overlays[f]}k.$watch("layers.baselayers",function(a){for(var c in
j.baselayers)i(a[c])||(b.hasLayer(j.baselayers[c])&&b.removeLayer(j.baselayers[c]),delete j.baselayers[c]);for(var e in 
a)if(i(j.baselayers[e]))a[e].top!==!0||b.hasLayer(j.baselayers[e])?a[e].top===!1&&b.hasLayer(j.baselayers[e])&&b.removeL
ayer(j.baselayers[e]):b.addLayer(j.baselayers[e]);else{var
f=m(a[e]);i(f)&&(j.baselayers[e]=f,a[e].top===!0&&b.addLayer(j.baselayers[e]))}var g=!1;for(var h in j.baselayers)if(b.h
asLayer(j.baselayers[h])){g=!0;break}!g&&Object.keys(l.baselayers).length>0&&b.addLayer(j.baselayers[Object.keys(l.basel
ayers)[0]]),o=n(b,d,o,a,l.overlays,j)},!0),k.$watch("layers.overlays",function(a){for(var c in
j.overlays)i(a[c])||(b.hasLayer(j.overlays[c])&&b.removeLayer(j.overlays[c]),delete j.overlays[c]);for(var e in
a){if(!i(j.overlays[e])){var f=m(a[e]);i(f)&&(j.overlays[e]=f,a[e].visible===!0&&b.addLayer(j.overlays[e]))}a[e].visible
&&!b.hasLayer(j.overlays[e])?b.addLayer(j.overlays[e]):a[e].visible===!1&&b.hasLayer(j.overlays[e])&&b.removeLayer(j.ove
rlays[e]),a[e].visible&&b._loaded&&a[e].data&&"heatmap"===a[e].type&&(j.overlays[e].setData(a[e].data),j.overlays[e].upd
ate())}o=n(b,d,o,l.baselayers,a,j)},!0)})}}}]),angular.module("leaflet-directive").directive("bounds",["$log","$timeout"
,"leafletHelpers","leafletBoundsHelpers",function(a,b,c,d){return{restrict:"A",scope:!1,replace:!1,require:["leaflet","c
enter"],link:function(e,f,g,h){var
i=c.isDefined,j=d.createLeafletBounds,k=h[0].getLeafletScope(),l=h[0],m=function(a){return 0===a._southWest.lat&&0===a._
southWest.lng&&0===a._northEast.lat&&0===a._northEast.lng};l.getMap().then(function(c){k.$on("boundsChanged",function(a)
{var b=a.currentScope,d=c.getBounds();if(!m(d)&&!b.settingBoundsFromScope){var e={northEast:{lat:d._northEast.lat,lng:d.
_northEast.lng},southWest:{lat:d._southWest.lat,lng:d._southWest.lng}};angular.equals(b.bounds,e)||(b.bounds=e)}}),k.$wa
tch("bounds",function(d){if(!i(d))return void a.error("[AngularJS - Leaflet] Invalid bounds");var f=j(d);f&&!c.getBounds
().equals(f)&&(e.settingBoundsFromScope=!0,c.fitBounds(f),b(function(){e.settingBoundsFromScope=!1}))},!0)})}}}]),angula
r.module("leaflet-directive").directive("markers",["$log","$rootScope","$q","leafletData","leafletHelpers","leafletMapDe
faults","leafletMarkersHelpers","leafletEvents",function(a,b,c,d,e,f,g,h){return{restrict:"A",scope:!1,replace:!1,requir
e:["leaflet","?layers"],link:function(b,f,i,j){var k=j[0],l=e,m=e.isDefined,n=e.isString,o=k.getLeafletScope(),p=g.delet
eMarker,q=g.addMarkerWatcher,r=g.listenMarkerEvents,s=g.addMarkerToGroup,t=h.bindMarkerEvents,u=g.createMarker;k.getMap(
).then(function(b){var e,f={};e=m(j[1])?j[1].getLayers:function(){var a=c.defer();return
a.resolve(),a.promise},e().then(function(c){d.setMarkers(f,i.id),o.$watch("markers",function(d){for(var e in
f)m(d)&&m(d[e])||(p(f[e],b,c),delete f[e]);var h=!m(i.watchMarkers)||"true"===i.watchMarkers;for(var j in
d)if(-1===j.search("-")){if(!m(f[j])){var k=d[j],v=u(k);if(!m(v)){a.error("[AngularJS - Leaflet] Received invalid data
on the marker "+j+".");continue}if(f[j]=v,m(k.message)&&v.bindPopup(k.message,k.popupOptions),m(k.group)){var w=m(k.grou
pOption)?k.groupOption:null;s(v,k.group,w,b)}if(l.LabelPlugin.isLoaded()&&m(k.label)&&m(k.label.message)&&v.bindLabel(k.
label.message,k.label.options),m(k)&&m(k.layer)){if(!n(k.layer)){a.error("[AngularJS - Leaflet] A layername must be a
string");continue}if(!m(c)){a.error("[AngularJS - Leaflet] You must add layers to the directive if the markers are going
to use this functionality.");continue}if(!m(c.overlays)||!m(c.overlays[k.layer])){a.error('[AngularJS - Leaflet] A
marker can only be added to a layer of type "group"');continue}var x=c.overlays[k.layer];if(!(x instanceof
L.LayerGroup||x instanceof L.FeatureGroup)){a.error('[AngularJS - Leaflet] Adding a marker to an overlay needs a overlay
of the type "group" or
"featureGroup"');continue}x.addLayer(v),!h&&b.hasLayer(v)&&k.focus===!0&&g.manageOpenPopup(v,k)}else
m(k.group)||(b.addLayer(v),h||k.focus!==!0||g.manageOpenPopup(v,k));h&&q(v,j,o,c,b),r(v,k,o,h),t(v,j,k,o)}}else
a.error('The marker can\'t use a "-" on his key name: "'+j+'".')},!0)})})}}}]),angular.module("leaflet-directive").direc
tive("paths",["$log","$q","leafletData","leafletMapDefaults","leafletHelpers","leafletPathsHelpers","leafletEvents",func
tion(a,b,c,d,e,f,g){return{restrict:"A",scope:!1,replace:!1,require:["leaflet","?layers"],link:function(h,i,j,k){var l=k
[0],m=e.isDefined,n=e.isString,o=l.getLeafletScope(),p=o.paths,q=f.createPath,r=g.bindPathEvents,s=f.setPathOptions;l.ge
tMap().then(function(f){var g,h=d.getDefaults(j.id);g=m(k[1])?k[1].getLayers:function(){var a=b.defer();return
a.resolve(),a.promise},m(p)&&g().then(function(b){var d={};c.setPaths(d,j.id);var
g=!m(j.watchPaths)||"true"===j.watchPaths,i=function(a,c){var
d=o.$watch('paths["'+c+'"]',function(c,e){if(!m(c)){if(m(e.layer))for(var g in b.overlays){var
h=b.overlays[g];h.removeLayer(a)}return f.removeLayer(a),void
d()}s(a,c.type,c)},!0)};o.$watchCollection("paths",function(c){for(var j in d)m(c[j])||(f.removeLayer(d[j]),delete
d[j]);for(var k in c)if(0!==k.search("\\$"))if(-1===k.search("-")){if(!m(d[k])){var l=c[k],p=q(k,c[k],h);if(m(p)&&m(l.me
ssage)&&p.bindPopup(l.message),e.LabelPlugin.isLoaded()&&m(l.label)&&m(l.label.message)&&p.bindLabel(l.label.message,l.l
abel.options),m(l)&&m(l.layer)){if(!n(l.layer)){a.error("[AngularJS - Leaflet] A layername must be a
string");continue}if(!m(b)){a.error("[AngularJS - Leaflet] You must add layers to the directive if the markers are going
to use this functionality.");continue}if(!m(b.overlays)||!m(b.overlays[l.layer])){a.error('[AngularJS - Leaflet] A
marker can only be added to a layer of type "group"');continue}var t=b.overlays[l.layer];if(!(t instanceof
L.LayerGroup||t instanceof L.FeatureGroup)){a.error('[AngularJS - Leaflet] Adding a marker to an overlay needs a overlay
of the type "group" or "featureGroup"');continue}d[k]=p,t.addLayer(p),g?i(p,k):s(p,l.type,l)}else
m(p)&&(d[k]=p,f.addLayer(p),g?i(p,k):s(p,l.type,l));r(p,k,l,o)}}else a.error('[AngularJS - Leaflet] The path name
"'+k+'" is not valid. It must not include "-" and a number.')})})})}}}]),angular.module("leaflet-directive").directive("
controls",["$log","leafletHelpers",function(a,b){return{restrict:"A",scope:!1,replace:!1,require:"?^leaflet",link:functi
on(a,c,d,e){if(e){var f=b.isDefined,g=e.getLeafletScope(),h=g.controls;e.getMap().then(function(a){if(f(L.Control.Draw)&
&f(h.draw)){f(h.edit)||(h.edit={featureGroup:new L.FeatureGroup},a.addLayer(h.edit.featureGroup));var b=new
L.Control.Draw(h);a.addControl(b)}if(f(h.scale)){var c=new L.control.scale;a.addControl(c)}if(f(h.custom))for(var d in
h.custom)a.addControl(h.custom[d])})}}}}]),angular.module("leaflet-directive").directive("eventBroadcast",["$log","$root
Scope","leafletHelpers","leafletEvents",function(a,b,c,d){return{restrict:"A",scope:!1,replace:!1,require:"leaflet",link
:function(b,e,f,g){var h=c.isObject,i=c.isDefined,j=g.getLeafletScope(),k=j.eventBroadcast,l=d.getAvailableMapEvents(),m
=d.genDispatchMapEvent;g.getMap().then(function(b){var
c,d,e=[],f="broadcast";if(i(k.map))if(h(k.map))if("emit"!==k.map.logic&&"broadcast"!==k.map.logic?a.warn("[AngularJS -
Leaflet] Available event propagation logic are: 'emit' or 'broadcast'."):f=k.map.logic,h(k.map.enable)&&k.map.enable.len
gth>=0)for(c=0;c<k.map.enable.length;c++)d=k.map.enable[c],-1===e.indexOf(d)&&-1!==l.indexOf(d)&&e.push(d);else
a.warn("[AngularJS - Leaflet] event-broadcast.map.enable must be an object check your model.");else a.warn("[AngularJS -
Leaflet] event-broadcast.map must be an object check your model.");else
e=l;for(c=0;c<e.length;c++)d=e[c],b.on(d,m(j,d,f),{eventName:d})})}}}]),angular.module("leaflet-directive").directive("m
axbounds",["$log","leafletMapDefaults","leafletBoundsHelpers",function(a,b,c){return{restrict:"A",scope:!1,replace:!1,re
quire:"leaflet",link:function(a,b,d,e){var
f=e.getLeafletScope(),g=c.isValidBounds;e.getMap().then(function(a){f.$watch("maxbounds",function(b){if(!g(b))return
void a.setMaxBounds();var c=[[b.southWest.lat,b.southWest.lng],[b.northEast.lat,b.northEast.lng]];a.setMaxBounds(c),d.ce
nter||a.fitBounds(c)})})}}}]),angular.module("leaflet-directive").directive("decorations",["$log","leafletHelpers",funct
ion(a,b){return{restrict:"A",scope:!1,replace:!1,require:"leaflet",link:function(c,d,e,f){function g(b){return
k(b)&&k(b.coordinates)&&(j.isLoaded()||a.error("[AngularJS - Leaflet] The PolylineDecorator Plugin is not
loaded.")),L.polylineDecorator(b.coordinates)}function h(a,b){return
k(a)&&k(b)&&k(b.coordinates)&&k(b.patterns)?(a.setPaths(b.coordinates),a.setPatterns(b.patterns),a):void 0}var i=f.getLe
afletScope(),j=b.PolylineDecoratorPlugin,k=b.isDefined,l={};f.getMap().then(function(a){i.$watch("decorations",function(
b){for(var c in l)k(b)&&k(b[c])||(a.removeLayer(l[c]),delete l[c]);for(var d in b){var
e=b[d],f=g(e);k(f)&&(l[d]=f,a.addLayer(f),h(f,e))}},!0)})}}}]),angular.module("leaflet-directive").directive("layercontr
ol",["$log","leafletData","leafletHelpers",function(a,b,c){return{restrict:"E",scope:{},replace:!0,transclude:!1,require
:"^leaflet",controller:["$scope","$element","$sce",function(d,e,f){a.debug("[Angular Directive - Layers]
layers",d,e);var g=c.safeApply,h=c.isDefined;angular.extend(d,{baselayer:"",icons:{uncheck:"fa fa-check-
square-o",check:"fa fa-square-o",radio:"fa fa-dot-circle-o",unradio:"fa fa-circle-o",up:"fa fa-angle-up",down:"fa fa-
angle-down",open:"fa fa-angle-double-down",close:"fa fa-angle-double-up"},changeBaseLayer:function(a,e){c.safeApply(d,fu
nction(c){c.baselayer=a,b.getMap().then(function(e){b.getLayers().then(function(b){if(!e.hasLayer(b.baselayers[a])){for(
var f in c.layers.baselayers)c.layers.baselayers[f].icon=c.icons.unradio,e.hasLayer(b.baselayers[f])&&e.removeLayer(b.ba
selayers[f]);e.addLayer(b.baselayers[a]),c.layers.baselayers[a].icon=d.icons.radio}})})}),e.preventDefault()},moveLayer:
function(a,b,c){var e=Object.keys(d.layers.baselayers).length;if(b>=1+e&&b<=d.overlaysArray.length+e){var f;for(var h in
d.layers.overlays)if(d.layers.overlays[h].index===b){f=d.layers.overlays[h];break}f&&g(d,function(){f.index=a.index,a.in
dex=b})}c.stopPropagation(),c.preventDefault()},initIndex:function(a,b){var c=Object.keys(d.layers.baselayers).length;a.
index=h(a.index)?a.index:b+c+1},toggleOpacity:function(b,c){if(a.debug("Event",b),c.visible){var
e=angular.element(b.currentTarget);e.toggleClass(d.icons.close+" "+d.icons.open),e=e.parents(".lf-row").find(".lf-opacit
y"),e.toggle("fast",function(){g(d,function(){c.opacityControl=!c.opacityControl})})}b.stopPropagation(),b.preventDefaul
t()},unsafeHTML:function(a){return f.trustAsHtml(a)}});var i=e.get(0);L.Browser.touch?L.DomEvent.on(i,"click",L.DomEvent
.stopPropagation):(L.DomEvent.disableClickPropagation(i),L.DomEvent.on(i,"mousewheel",L.DomEvent.stopPropagation))}],tem
plate:'<div class="angular-leaflet-control-layers" ng-show="overlaysArray.length"><div class="lf-baselayers"><div class
="lf-row" ng-repeat="(key, layer) in layers.baselayers"><label class="lf-icon-bl" ng-click="changeBaseLayer(key,
$event)"><input class="leaflet-control-layers-selector" type="radio" name="lf-radio" ng-show="false" ng-
checked="baselayer === key" ng-value="key" /> <i class="lf-icon lf-icon-radio" ng-class="layer.icon"></i><div class="lf-
text">{{layer.name}}</div></label></div></div><div class="lf-overlays"><div class="lf-container"><div class="lf-row" ng-
repeat="layer in overlaysArray | orderBy:\'index\':order" ng-init="initIndex(layer, $index)"><label class="lf-icon-
ol"><input class="lf-control-layers-selector" type="checkbox" ng-show="false" ng-model="layer.visible"/> <i class="lf-
icon lf-icon-check" ng-class="layer.icon"></i><div class="lf-text">{{layer.name}}</div><div class="lf-icons"><i class
="lf-icon lf-up" ng-class="icons.up" ng-click="moveLayer(layer, layer.index - orderNumber, $event)"></i> <i class="lf-
icon lf-down" ng-class="icons.down" ng-click="moveLayer(layer, layer.index + orderNumber, $event)"></i> <i class="lf-
icon lf-open" ng-class="layer.opacityControl? icons.close:icons.open" ng-click="toggleOpacity($event,
layer)"></i></div></label><div class="lf-legend" ng-if="layer.legend" ng-bind-html="unsafeHTML(layer.legend)"></div><div
class="lf-opacity" ng-show="layer.visible &amp;&amp; layer.opacityControl"><input type="text" class="lf-opacity-control"
name="lf-opacity-control" data-key="{{layer.index}}" /></div></div></div></div></div>',link:function(d,e,f,g){var h=c.is
Defined,i=g.getLeafletScope(),j=i.layers;f.order=!h(f.order)||"normal"!==f.order&&"reverse"!==f.order?"normal":f.order,d
.order="normal"===f.order,d.orderNumber="normal"===f.order?-1:1,d.layers=j,g.getMap().then(function(c){i.$watch("layers.
baselayers",function(a){b.getLayers().then(function(b){var e;for(e in
a)a[e].icon=c.hasLayer(b.baselayers[e])?d.icons.radio:d.icons.unradio})}),i.$watch("layers.overlays",function(f){var
g=[];b.getLayers().then(function(a){for(var b in f)f[b].icon=d.icons[f[b].visible?"uncheck":"check"],g.push(f[b]),h(f[b]
.index)&&a.overlays[b].setZIndex&&a.overlays[b].setZIndex(f[b].index)});var i=d.$watch(function(){return
e.children().size()>1?(e.find(".lf-overlays").trigger("resize"),e.find(".lf-
opacity").size()===Object.keys(j.overlays).length):void 0},function(f){f===!0&&(h(e.find(".lf-opacity-
control").ionRangeSlider)?e.find(".lf-opacity-control").each(function(a,e){var
f,g=Object.keys(j.baselayers).length;for(var i in
d.overlaysArray)d.overlaysArray[i].index===a+g+1&&(f=d.overlaysArray[i]);var
k=angular.element(e),l=h(f)&&h(f.layerOptions)?f.layerOptions.opacity:void 0;k.ionRangeSlider({min:0,from:h(l)?Math.ceil
(100*l):100,step:1,max:100,prettify:!1,hasGrid:!1,hideMinMax:!0,onChange:function(a){b.getLayers().then(function(b){var
d,e,f=a.input.data().key;for(var g in j.overlays)if(j.overlays[g].index===f){d=b.overlays[g],e=j.overlays[g];break}c.has
Layer(d)&&(e.layerOptions=h(e.layerOptions)?e.layerOptions:{},e.layerOptions.opacity=a.input.val()/100,d.setOpacity&&d.s
etOpacity(a.input.val()/100),d.getLayers&&d.eachLayer&&d.eachLayer(function(b){b.setOpacity&&b.setOpacity(a.input.val()/
100)}))})}})}):a.warn("[AngularJS - Leaflet] Ion Slide Range Plugin is not
loaded"),i())});d.overlaysArray=g},!0)})}}}]),angular.module("leaflet-
directive").service("leafletData",["$log","$q","leafletHelpers",function(a,b,c){var d=c.getDefer,e=c.getUnresolvedDefer,
f=c.setResolvedDefer,g={},h={},i={},j={},k={},l={},m={},n={};this.setMap=function(a,b){var
c=e(g,b);c.resolve(a),f(g,b)},this.getMap=function(a){var b=d(g,a);return b.promise},this.unresolveMap=function(a){var
b=c.obtainEffectiveMapId(g,a);g[b]=void 0,h[b]=void 0,i[b]=void 0,j[b]=void 0,k[b]=void 0,l[b]=void 0,m[b]=void
0,n[b]=void 0},this.getPaths=function(a){var b=d(j,a);return b.promise},this.setPaths=function(a,b){var
c=e(j,b);c.resolve(a),f(j,b)},this.getMarkers=function(a){var b=d(k,a);return
b.promise},this.setMarkers=function(a,b){var c=e(k,b);c.resolve(a),f(k,b)},this.getLayers=function(a){var
b=d(i,a);return b.promise},this.setLayers=function(a,b){var
c=e(i,b);c.resolve(a),f(i,b)},this.getUTFGrid=function(a){var b=d(m,a);return
b.promise},this.setUTFGrid=function(a,b){var c=e(m,b);c.resolve(a),f(m,b)},this.setTiles=function(a,b){var
c=e(h,b);c.resolve(a),f(h,b)},this.getTiles=function(a){var b=d(h,a);return b.promise},this.setGeoJSON=function(a,b){var
c=e(l,b);c.resolve(a),f(l,b)},this.getGeoJSON=function(a){var b=d(l,a);return
b.promise},this.setDecorations=function(a,b){var c=e(n,b);c.resolve(a),f(n,b)},this.getDecorations=function(a){var
b=d(n,a);return b.promise}}]),angular.module("leaflet-
directive").factory("leafletMapDefaults",["$q","leafletHelpers",function(a,b){function c(){return{keyboard:!0,dragging:!
0,worldCopyJump:!1,doubleClickZoom:!0,scrollWheelZoom:!0,tap:!0,touchZoom:!0,zoomControl:!0,zoomsliderControl:!1,zoomCon
trolPosition:"topleft",attributionControl:!0,controls:{layers:{visible:!0,position:"topright",collapsed:!0}},crs:L.CRS.E
PSG3857,tileLayer:"//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",tileLayerOptions:{attribution:'&copy; <a
href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
contributors'},path:{weight:10,opacity:1,color:"#0000ff"},center:{lat:0,lng:0,zoom:1}}}var
d=b.isDefined,e=b.isObject,f=b.obtainEffectiveMapId,g={};return{getDefaults:function(a){var b=f(g,a);return
g[b]},getMapCreationDefaults:function(a){var b=f(g,a),c=g[b],e={maxZoom:c.maxZoom,keyboard:c.keyboard,dragging:c.draggin
g,zoomControl:c.zoomControl,doubleClickZoom:c.doubleClickZoom,scrollWheelZoom:c.scrollWheelZoom,tap:c.tap,touchZoom:c.to
uchZoom,attributionControl:c.attributionControl,worldCopyJump:c.worldCopyJump,crs:c.crs};if(d(c.minZoom)&&(e.minZoom=c.m
inZoom),d(c.zoomAnimation)&&(e.zoomAnimation=c.zoomAnimation),d(c.fadeAnimation)&&(e.fadeAnimation=c.fadeAnimation),d(c.
markerZoomAnimation)&&(e.markerZoomAnimation=c.markerZoomAnimation),c.map)for(var h in c.map)e[h]=c.map[h];return
e},setDefaults:function(a,b){var h=c();d(a)&&(h.doubleClickZoom=d(a.doubleClickZoom)?a.doubleClickZoom:h.doubleClickZoom
,h.scrollWheelZoom=d(a.scrollWheelZoom)?a.scrollWheelZoom:h.doubleClickZoom,h.tap=d(a.tap)?a.tap:h.tap,h.touchZoom=d(a.t
ouchZoom)?a.touchZoom:h.doubleClickZoom,h.zoomControl=d(a.zoomControl)?a.zoomControl:h.zoomControl,h.zoomsliderControl=d
(a.zoomsliderControl)?a.zoomsliderControl:h.zoomsliderControl,h.attributionControl=d(a.attributionControl)?a.attribution
Control:h.attributionControl,h.tileLayer=d(a.tileLayer)?a.tileLayer:h.tileLayer,h.zoomControlPosition=d(a.zoomControlPos
ition)?a.zoomControlPosition:h.zoomControlPosition,h.keyboard=d(a.keyboard)?a.keyboard:h.keyboard,h.dragging=d(a.draggin
g)?a.dragging:h.dragging,d(a.controls)&&angular.extend(h.controls,a.controls),e(a.crs)?h.crs=a.crs:d(L.CRS[a.crs])&&(h.c
rs=L.CRS[a.crs]),d(a.center)&&angular.copy(a.center,h.center),d(a.tileLayerOptions)&&angular.copy(a.tileLayerOptions,h.t
ileLayerOptions),d(a.maxZoom)&&(h.maxZoom=a.maxZoom),d(a.minZoom)&&(h.minZoom=a.minZoom),d(a.zoomAnimation)&&(h.zoomAnim
ation=a.zoomAnimation),d(a.fadeAnimation)&&(h.fadeAnimation=a.fadeAnimation),d(a.markerZoomAnimation)&&(h.markerZoomAnim
ation=a.markerZoomAnimation),d(a.worldCopyJump)&&(h.worldCopyJump=a.worldCopyJump),d(a.map)&&(h.map=a.map));var
i=f(g,b);return g[i]=h,h}}}]),angular.module("leaflet-
directive").factory("leafletEvents",["$rootScope","$q","$log","leafletHelpers",function(a,b,c,d){var e=d.safeApply,f=d.i
sDefined,g=d.isObject,h=d,i=function(){return["click","dblclick","mousedown","mouseover","mouseout","contextmenu"]},j=fu
nction(a,b,c,d){for(var e=i(),f="markers."+d,g=0;g<e.length;g++){var
h=e[g];c.label.on(h,m(a,h,b,c.label,f))}},k=function(b,c,d,f,g,h){return function(i){var j="leafletDirectiveMarker."+b;"
click"===b?e(d,function(){a.$broadcast("leafletDirectiveMarkersClick",g)}):"dragend"===b&&(e(d,function(){h.lat=f.getLat
Lng().lat,h.lng=f.getLatLng().lng}),h.message&&h.focus===!0&&f.openPopup()),e(d,function(b){"emit"===c?b.$emit(j,{marker
Name:g,leafletEvent:i}):a.$broadcast(j,{markerName:g,leafletEvent:i})})}},l=function(b,c,d,f,g){return function(f){var h
="leafletDirectivePath."+b;e(d,function(b){"emit"===c?b.$emit(h,{pathName:g,leafletEvent:f}):a.$broadcast(h,{pathName:g,
leafletEvent:f})})}},m=function(b,c,d,f,g){return function(h){var i="leafletDirectiveLabel."+c,j=g.replace("markers.",""
);e(b,function(b){"emit"===d?b.$emit(i,{leafletEvent:h,label:f,markerName:j}):"broadcast"===d&&a.$broadcast(i,{leafletEv
ent:h,label:f,markerName:j})})}},n=function(){return["click","dblclick","mousedown","mouseover","mouseout","contextmenu"
,"dragstart","drag","dragend","move","remove","popupopen","popupclose"]},o=function(){return["click","dblclick","mousedo
wn","mouseover","mouseout","contextmenu","add","remove","popupopen","popupclose"]};return{getAvailableMapEvents:function
(){return["click","dblclick","mousedown","mouseup","mouseover","mouseout","mousemove","contextmenu","focus","blur","prec
lick","load","unload","viewreset","movestart","move","moveend","dragstart","drag","dragend","zoomstart","zoomend","zooml
evelschange","resize","autopanstart","layeradd","layerremove","baselayerchange","overlayadd","overlayremove","locationfo
und","locationerror","popupopen","popupclose","draw:created","draw:edited","draw:deleted","draw:drawstart","draw:drawsto
p","draw:editstart","draw:editstop","draw:deletestart","draw:deletestop"]},genDispatchMapEvent:function(b,c,d){return
function(f){var g="leafletDirectiveMap."+c;e(b,function(b){"emit"===d?b.$emit(g,{leafletEvent:f}):"broadcast"===d&&a.$br
oadcast(g,{leafletEvent:f})})}},getAvailableMarkerEvents:n,getAvailablePathEvents:o,notifyCenterChangedToBounds:function
(a){a.$broadcast("boundsChanged")},notifyCenterUrlHashChanged:function(a,b,c,d){if(f(c.urlHashCenter)){var e=b.getCenter
(),g=e.lat.toFixed(4)+":"+e.lng.toFixed(4)+":"+b.getZoom();f(d.c)&&d.c===g||a.$emit("centerUrlHash",g)}},bindMarkerEvent
s:function(a,b,d,e){var i,l,m=[],o="emit";if(f(e.eventBroadcast))if(g(e.eventBroadcast))if(f(e.eventBroadcast.marker))if
(g(e.eventBroadcast.marker)){void 0!==e.eventBroadcast.marker.logic&&null!==e.eventBroadcast.marker.logic&&("emit"!==e.e
ventBroadcast.marker.logic&&"broadcast"!==e.eventBroadcast.marker.logic?c.warn("[AngularJS - Leaflet] Available event
propagation logic are: 'emit' or 'broadcast'."):"emit"===e.eventBroadcast.marker.logic&&(o="emit"));var
p=!1,q=!1;if(void 0!==e.eventBroadcast.marker.enable&&null!==e.eventBroadcast.marker.enable&&"object"==typeof
e.eventBroadcast.marker.enable&&(p=!0),void
0!==e.eventBroadcast.marker.disable&&null!==e.eventBroadcast.marker.disable&&"object"==typeof
e.eventBroadcast.marker.disable&&(q=!0),p&&q)c.warn("[AngularJS - Leaflet] can not enable and disable events at the same
time");else if(p||q)if(p)for(i=0;i<e.eventBroadcast.marker.enable.length;i++)l=e.eventBroadcast.marker.enable[i],-1!==m.
indexOf(l)?c.warn("[AngularJS - Leaflet] This event "+l+" is already enabled"):-1===n().indexOf(l)?c.warn("[AngularJS -
Leaflet] This event "+l+" does not exist"):m.push(l);else
for(m=n(),i=0;i<e.eventBroadcast.marker.disable.length;i++){l=e.eventBroadcast.marker.disable[i];var
r=m.indexOf(l);-1===r?c.warn("[AngularJS - Leaflet] This event "+l+" does not exist or has been already
disabled"):m.splice(r,1)}else c.warn("[AngularJS - Leaflet] must enable or disable events")}else c.warn("[AngularJS -
Leaflet] event-broadcast.marker must be an object check your model.");else m=n();else c.error("[AngularJS - Leaflet]
event-broadcast must be an object check your model.");else m=n();for(i=0;i<m.length;i++)l=m[i],a.on(l,k(l,o,e,a,b,d));h.
LabelPlugin.isLoaded()&&f(a.label)&&j(e,o,a,b)},bindPathEvents:function(a,b,d,e){var i,k,m=[],n="broadcast";if(f(e.event
Broadcast))if(g(e.eventBroadcast))if(f(e.eventBroadcast.path))if(g(e.eventBroadcast.paths))c.warn("[AngularJS - Leaflet]
event-broadcast.path must be an object check your model.");else{void 0!==e.eventBroadcast.path.logic&&null!==e.eventBroa
dcast.path.logic&&("emit"!==e.eventBroadcast.path.logic&&"broadcast"!==e.eventBroadcast.path.logic?c.warn("[AngularJS -
Leaflet] Available event propagation logic are: 'emit' or
'broadcast'."):"emit"===e.eventBroadcast.path.logic&&(n="emit")); var p=!1,q=!1;if(void
0!==e.eventBroadcast.path.enable&&null!==e.eventBroadcast.path.enable&&"object"==typeof
e.eventBroadcast.path.enable&&(p=!0),void
0!==e.eventBroadcast.path.disable&&null!==e.eventBroadcast.path.disable&&"object"==typeof
e.eventBroadcast.path.disable&&(q=!0),p&&q)c.warn("[AngularJS - Leaflet] can not enable and disable events at the same
time");else if(p||q)if(p)for(i=0;i<e.eventBroadcast.path.enable.length;i++)k=e.eventBroadcast.path.enable[i],-1!==m.inde
xOf(k)?c.warn("[AngularJS - Leaflet] This event "+k+" is already enabled"):-1===o().indexOf(k)?c.warn("[AngularJS -
Leaflet] This event "+k+" does not exist"):m.push(k);else
for(m=o(),i=0;i<e.eventBroadcast.path.disable.length;i++){k=e.eventBroadcast.path.disable[i];var
r=m.indexOf(k);-1===r?c.warn("[AngularJS - Leaflet] This event "+k+" does not exist or has been already
disabled"):m.splice(r,1)}else c.warn("[AngularJS - Leaflet] must enable or disable events")}else m=o();else
c.error("[AngularJS - Leaflet] event-broadcast must be an object check your model.");else m=o();for(i=0;i<m.length;i++)k
=m[i],a.on(k,l(k,n,e,m,b));h.LabelPlugin.isLoaded()&&f(a.label)&&j(e,n,a,b)}}}]),angular.module("leaflet-directive").fac
tory("leafletLayerHelpers",["$rootScope","$log","leafletHelpers",function($rootScope,$log,leafletHelpers){function
isValidLayerType(a){return isString(a.type)?-1===Object.keys(layerTypes).indexOf(a.type)?($log.error("[AngularJS -
Leaflet] A layer must have a valid type:
"+Object.keys(layerTypes)),!1):layerTypes[a.type].mustHaveUrl&&!isString(a.url)?($log.error("[AngularJS - Leaflet] A
base layer must have an url"),!1):layerTypes[a.type].mustHaveData&&!isDefined(a.data)?($log.error('[AngularJS - Leaflet]
The base layer must have a "data" array
attribute'),!1):layerTypes[a.type].mustHaveLayer&&!isDefined(a.layer)?($log.error("[AngularJS - Leaflet] The type of
layer "+a.type+" must have an layer
defined"),!1):layerTypes[a.type].mustHaveBounds&&!isDefined(a.bounds)?($log.error("[AngularJS - Leaflet] The type of
layer "+a.type+" must have bounds
defined"),!1):layerTypes[a.type].mustHaveKey&&!isDefined(a.key)?($log.error("[AngularJS - Leaflet] The type of layer
"+a.type+" must have key defined"),!1):!0:($log.error("[AngularJS - Leaflet] A layer must have a valid type
defined."),!1)}function createLayer(a){if(isValidLayerType(a)){if(!isString(a.name))return void $log.error("[AngularJS -
Leaflet] A base layer must have a
name");isObject(a.layerParams)||(a.layerParams={}),isObject(a.layerOptions)||(a.layerOptions={});for(var b in
a.layerParams)a.layerOptions[b]=a.layerParams[b];var c={url:a.url,data:a.data,options:a.layerOptions,layer:a.layer,type:
a.layerType,bounds:a.bounds,key:a.key,pluginOptions:a.pluginOptions,user:a.user};return
layerTypes[a.type].createLayer(c)}}var Helpers=leafletHelpers,isString=leafletHelpers.isString,isObject=leafletHelpers.i
sObject,isDefined=leafletHelpers.isDefined,utfGridCreateLayer=function(a){if(!Helpers.UTFGridPlugin.isLoaded())return
void $log.error("[AngularJS - Leaflet] The UTFGrid plugin is not loaded.");var b=new
L.UtfGrid(a.url,a.pluginOptions);return b.on("mouseover",function(a){$rootScope.$broadcast("leafletDirectiveMap.utfgridM
ouseover",a)}),b.on("mouseout",function(a){$rootScope.$broadcast("leafletDirectiveMap.utfgridMouseout",a)}),b.on("click"
,function(a){$rootScope.$broadcast("leafletDirectiveMap.utfgridClick",a)}),b},layerTypes={xyz:{mustHaveUrl:!0,createLaye
r:function(a){return L.tileLayer(a.url,a.options)}},mapbox:{mustHaveKey:!0,createLayer:function(a){var
b="//{s}.tiles.mapbox.com/v3/"+a.key+"/{z}/{x}/{y}.png";return
L.tileLayer(b,a.options)}},geoJSON:{mustHaveUrl:!0,createLayer:function(a){return Helpers.GeoJSONPlugin.isLoaded()?new
L.TileLayer.GeoJSON(a.url,a.pluginOptions,a.options):void
0}},utfGrid:{mustHaveUrl:!0,createLayer:utfGridCreateLayer},cartodbTiles:{mustHaveKey:!0,createLayer:function(a){var
b="//"+a.user+".cartodb.com/api/v1/map/"+a.key+"/{z}/{x}/{y}.png";return
L.tileLayer(b,a.options)}},cartodbUTFGrid:{mustHaveKey:!0,mustHaveLayer:!0,createLayer:function(a){return a.url="//"+a.u
ser+".cartodb.com/api/v1/map/"+a.key+"/"+a.layer+"/{z}/{x}/{y}.grid.json",utfGridCreateLayer(a)}},cartodbInteractive:{mu
stHaveKey:!0,mustHaveLayer:!0,createLayer:function(a){var b="//"+a.user+".cartodb.com/api/v1/map/"+a.key+"/{z}/{x}/{y}.p
ng",c=L.tileLayer(b,a.options);a.url="//"+a.user+".cartodb.com/api/v1/map/"+a.key+"/"+a.layer+"/{z}/{x}/{y}.grid.json";v
ar d=utfGridCreateLayer(a);return L.layerGroup([c,d])}},wms:{mustHaveUrl:!0,createLayer:function(a){return
L.tileLayer.wms(a.url,a.options)}},wmts:{mustHaveUrl:!0,createLayer:function(a){return L.tileLayer.wmts(a.url,a.options)
}},wfs:{mustHaveUrl:!0,mustHaveLayer:!0,createLayer:function(params){if(Helpers.WFSLayerPlugin.isLoaded()){var
options=angular.copy(params.options);return options.crs&&"string"==typeof
options.crs&&(options.crs=eval(options.crs)),new
L.GeoJSON.WFS(params.url,params.layer,options)}}},group:{mustHaveUrl:!1,createLayer:function(a){var b=[];return angular.
forEach(a.options.layers,function(a){b.push(createLayer(a))}),L.layerGroup(b)}},featureGroup:{mustHaveUrl:!1,createLayer
:function(){return L.featureGroup()}},google:{mustHaveUrl:!1,createLayer:function(a){var
b=a.type||"SATELLITE";if(Helpers.GoogleLayerPlugin.isLoaded())return new
L.Google(b,a.options)}},china:{mustHaveUrl:!1,createLayer:function(a){var
b=a.type||"";if(Helpers.ChinaLayerPlugin.isLoaded())return L.tileLayer.chinaProvider(b,a.options)}},ags:{mustHaveUrl:!0,
createLayer:function(a){if(Helpers.AGSLayerPlugin.isLoaded()){var
b=angular.copy(a.options);angular.extend(b,{url:a.url});var c=new lvector.AGS(b);return c.onAdd=function(a){this.setMap(
a)},c.onRemove=function(){this.setMap(null)},c}}},dynamic:{mustHaveUrl:!0,createLayer:function(a){return
Helpers.DynamicMapLayerPlugin.isLoaded()?L.esri.dynamicMapLayer(a.url,a.options):void
0}},markercluster:{mustHaveUrl:!1,createLayer:function(a){return Helpers.MarkerClusterPlugin.isLoaded()?new
L.MarkerClusterGroup(a.options):void $log.error("[AngularJS - Leaflet] The markercluster plugin is not
loaded.")}},bing:{mustHaveUrl:!1,createLayer:function(a){return Helpers.BingLayerPlugin.isLoaded()?new
L.BingLayer(a.key,a.options):void
0}},heatmap:{mustHaveUrl:!1,mustHaveData:!0,createLayer:function(a){if(Helpers.HeatMapLayerPlugin.isLoaded()){var b=new
L.TileLayer.WebGLHeatMap(a.options);return
isDefined(a.data)&&b.setData(a.data),b}}},yandex:{mustHaveUrl:!1,createLayer:function(a){var
b=a.type||"map";if(Helpers.YandexLayerPlugin.isLoaded())return new
L.Yandex(b,a.options)}},imageOverlay:{mustHaveUrl:!0,mustHaveBounds:!0,createLayer:function(a){return
L.imageOverlay(a.url,a.bounds,a.options)}},custom:{createLayer:function(a){return a.layer instanceof
L.Class?angular.copy(a.layer):void $log.error("[AngularJS - Leaflet] A custom layer must be a leaflet
Class")}},cartodb:{mustHaveUrl:!0,createLayer:function(a){return
cartodb.createLayer(a.map,a.url)}}};return{createLayer:createLayer}}]),angular.module("leaflet-directive").factory("leaf
letControlHelpers",["$rootScope","$log","leafletHelpers","leafletMapDefaults",function(a,b,c,d){var
e,f=c.isObject,g=c.isDefined,h=function(a,b,c){var e=d.getDefaults(c);if(!e.controls.layers.visible)return!1;var
g=0;return f(a)&&(g+=Object.keys(a).length),f(b)&&(g+=Object.keys(b).length),g>1},i=function(a){var b=d.getDefaults(a),c
={collapsed:b.controls.layers.collapsed,position:b.controls.layers.position};angular.extend(c,b.controls.layers.options)
;var e;return e=b.controls.layers&&g(b.controls.layers.control)?b.controls.layers.control.apply(this,[[],[],c]):new
L.control.layers([],[],c)};return{layersControlMustBeVisible:h,updateLayersControl:function(a,b,c,d,f,j){var
k,l=h(d,f,b);if(g(e)&&c){for(k in j.baselayers)e.removeLayer(j.baselayers[k]);for(k in
j.overlays)e.removeLayer(j.overlays[k]);e.removeFrom(a)}if(l){e=i(b);for(k in d){var m=g(d[k].layerOptions)&&d[k].layerO
ptions.showOnSelector===!1;!m&&g(j.baselayers[k])&&e.addBaseLayer(j.baselayers[k],d[k].name)}for(k in f){var n=g(f[k].la
yerOptions)&&f[k].layerOptions.showOnSelector===!1;!n&&g(j.overlays[k])&&e.addOverlay(j.overlays[k],f[k].name)}e.addTo(a
)}return l}}}]),angular.module("leaflet-directive").factory("leafletLegendHelpers",function(){var
a=function(a,b,c,d){if(a.innerHTML="",b.error)a.innerHTML+='<div class="info-title alert alert-
danger">'+b.error.message+"</div>";else if("arcgis"===c)for(var e=0;e<b.layers.length;e++){var
f=b.layers[e];a.innerHTML+='<div class="info-title" data-layerid="'+f.layerId+'">'+f.layerName+"</div>";for(var
g=0;g<f.legend.length;g++){var h=f.legend[g];a.innerHTML+='<div class="inline" data-layerid="'+f.layerId+'"><img
src="data:'+h.contentType+";base64,"+h.imageData+'" /></div><div class="info-label" data-
layerid="'+f.layerId+'">'+h.label+"</div>"}}else"image"===c&&(a.innerHTML='<img
src="'+d+'"/>')},b=function(b,c,d,e){return function(){var f=L.DomUtil.create("div",c);return L.Browser.touch?L.DomEvent
.on(f,"click",L.DomEvent.stopPropagation):(L.DomEvent.disableClickPropagation(f),L.DomEvent.on(f,"mousewheel",L.DomEvent
.stopPropagation)),a(f,b,d,e),f}},c=function(a,b){return function(){for(var
c=L.DomUtil.create("div",b),d=0;d<a.colors.length;d++)c.innerHTML+='<div class="outline"><i
style="background:'+a.colors[d]+'"></i></div><div class="info-label">'+a.labels[d]+"</div>";return L.Browser.touch?L.Dom
Event.on(c,"click",L.DomEvent.stopPropagation):(L.DomEvent.disableClickPropagation(c),L.DomEvent.on(c,"mousewheel",L.Dom
Event.stopPropagation)),c}};return{getOnAddLegend:b,getOnAddArrayLegend:c,updateLegend:a}}),angular.module("leaflet-
directive").factory("leafletPathsHelpers",["$rootScope","$log","leafletHelpers",function(a,b,c){function d(a){return
a.filter(function(a){return k(a)}).map(function(a){return e(a)})}function e(a){return i(a)?new L.LatLng(a[0],a[1]):new
L.LatLng(a.lat,a.lng)}function f(a){return a.map(function(a){return d(a)})}function g(a,b){for(var
c={},d=0;d<l.length;d++){var e=l[d];h(a[e])?c[e]=a[e]:h(b.path[e])&&(c[e]=b.path[e])}return c}var h=c.isDefined,i=c.isAr
ray,j=c.isNumber,k=c.isValidPoint,l=["stroke","weight","color","opacity","fill","fillColor","fillOpacity","dashArray","l
ineCap","lineJoin","clickable","pointerEvents","className","smoothFactor","noClip"],m=function(a,b){for(var
c={},d=0;d<l.length;d++){var e=l[d];h(b[e])&&(c[e]=b[e])}a.setStyle(b)},n=function(a){if(!i(a))return!1;for(var
b=0;b<a.length;b++){var c=a[b];if(!k(c))return!1}return!0},o={polyline:{isValid:function(a){var b=a.latlngs;return
n(b)},createPath:function(a){return new
L.Polyline([],a)},setPath:function(a,b){a.setLatLngs(d(b.latlngs)),m(a,b)}},multiPolyline:{isValid:function(a){var
b=a.latlngs;if(!i(b))return!1;for(var c in b){var d=b[c];if(!n(d))return!1}return!0},createPath:function(a){return new L
.multiPolyline([[[0,0],[1,1]]],a)},setPath:function(a,b){a.setLatLngs(f(b.latlngs)),m(a,b)}},polygon:{isValid:function(a
){var b=a.latlngs;return n(b)},createPath:function(a){return new
L.Polygon([],a)},setPath:function(a,b){a.setLatLngs(d(b.latlngs)),m(a,b)}},multiPolygon:{isValid:function(a){var
b=a.latlngs;if(!i(b))return!1;for(var c in b){var d=b[c];if(!n(d))return!1}return!0},createPath:function(a){return new L
.MultiPolygon([[[0,0],[1,1],[0,1]]],a)},setPath:function(a,b){a.setLatLngs(f(b.latlngs)),m(a,b)}},rectangle:{isValid:fun
ction(a){var b=a.latlngs;if(!i(b)||2!==b.length)return!1;for(var c in b){var
d=b[c];if(!k(d))return!1}return!0},createPath:function(a){return new
L.Rectangle([[0,0],[1,1]],a)},setPath:function(a,b){a.setBounds(new
L.LatLngBounds(d(b.latlngs))),m(a,b)}},circle:{isValid:function(a){var b=a.latlngs;return
k(b)&&j(a.radius)},createPath:function(a){return new L.Circle([0,0],1,a)},setPath:function(a,b){a.setLatLng(e(b.latlngs)
),h(b.radius)&&a.setRadius(b.radius),m(a,b)}},circleMarker:{isValid:function(a){var b=a.latlngs;return
k(b)&&j(a.radius)},createPath:function(a){return new L.CircleMarker([0,0],a)},setPath:function(a,b){a.setLatLng(e(b.latl
ngs)),h(b.radius)&&a.setRadius(b.radius),m(a,b)}}},p=function(a){var b={};return a.latlngs&&(b.latlngs=a.latlngs),a.radi
us&&(b.radius=a.radius),b};return{setPathOptions:function(a,b,c){h(b)||(b="polyline"),o[b].setPath(a,c)},createPath:func
tion(a,c,d){h(c.type)||(c.type="polyline");var e=g(c,d),f=p(c);return o[c.type].isValid(f)?o[c.type].createPath(e):void
b.error("[AngularJS - Leaflet] Invalid data passed to the "+c.type+" path")}}}]),angular.module("leaflet-
directive").factory("leafletBoundsHelpers",["$log","leafletHelpers",function(a,b){function c(a){return angular.isDefined
(a)&&angular.isDefined(a.southWest)&&angular.isDefined(a.northEast)&&angular.isNumber(a.southWest.lat)&&angular.isNumber
(a.southWest.lng)&&angular.isNumber(a.northEast.lat)&&angular.isNumber(a.northEast.lng)}var
d=b.isArray,e=b.isNumber;return{createLeafletBounds:function(a){return
c(a)?L.latLngBounds([a.southWest.lat,a.southWest.lng],[a.northEast.lat,a.northEast.lng]):void
0},isValidBounds:c,createBoundsFromArray:function(b){return d(b)&&2===b.length&&d(b[0])&&d(b[1])&&2===b[0].length&&2===b
[1].length&&e(b[0][0])&&e(b[0][1])&&e(b[1][0])&&e(b[1][1])?{northEast:{lat:b[0][0],lng:b[0][1]},southWest:{lat:b[1][0],l
ng:b[1][1]}}:void a.error("[AngularJS - Leaflet] The bounds array is not valid.")}}}]),angular.module("leaflet-
directive").factory("leafletMarkersHelpers",["$rootScope","leafletHelpers","$log","$compile",function(a,b,c,d){var e=b.i
sDefined,f=b.MarkerClusterPlugin,g=b.AwesomeMarkersPlugin,h=b.MakiMarkersPlugin,i=b.ExtraMarkersPlugin,j=b.safeApply,k=b
,l=b.isString,m=b.isNumber,n=b.isObject,o={},p=function(a){if(e(a)&&e(a.type)&&"awesomeMarker"===a.type)return
g.isLoaded()||c.error("[AngularJS - Leaflet] The AwesomeMarkers Plugin is not loaded."),new
L.AwesomeMarkers.icon(a);if(e(a)&&e(a.type)&&"makiMarker"===a.type)return h.isLoaded()||c.error("[AngularJS - Leaflet]
The MakiMarkers Plugin is not loaded."),new L.MakiMarkers.icon(a);if(e(a)&&e(a.type)&&"extraMarker"===a.type)return
i.isLoaded()||c.error("[AngularJS - Leaflet] The ExtraMarkers Plugin is not loaded."),new
L.ExtraMarkers.icon(a);if(e(a)&&e(a.type)&&"div"===a.type)return new L.divIcon(a);var b="data:image/png;base64,iVBORw0KG
goAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAGmklEQVRYw7VXeUyTZxjvNnfELFuyIzOabermMZEeQC/OclkO49CpOHXOLJl/CAURuYbQi3KLgEhbrhZ1a
DwmaoGqKII6odATmH/scDFbdC7LvFqOCc+e95s2VG50X/LLm/f4/Z7neY/ne18aANCmAr5E/xZf1uDOkTcGcWR6hl9247tT5U7Y6SNvWsKT63P58qbfeLJG8
M5qcgTknrvvrdDbsT7Ml+tv82X6vVxJE33aRmgSyYtcWVMqX97Yv2JvW39UhRE2HuyBL+t+gK1116ly06EeWFNlAmHxlQE0OMiV6mQCScusKRlhS3QLeVJdl
1+23h5dY4FNB3thrbYboqptEFlphTC1hSpJnbRvxP4NWgsE5Jyz86QNNi/5qSUTGuFk1gu54tN9wuK2wc3o+Wc13RCmsoBwEqzGcZsxsvCSy/9wJKf7UWf1m
EY8JWfewc67UUoDbDjQC+FqK4QqLVMGGR9d2wurKzqBk3nqIT/9zLxRRjgZ9bqQgub+DdoeCC03Q8j+0QhFhBHR/eP3U/zCln7Uu+hihJ1+bBNffLIvmkyP0
gpBZWYXhKussK6mBz5HT6M1Nqpcp+mBCPXosYQfrekGvrjewd59/GvKCE7TbK/04/ZV5QZYVWmDwH1mF3xa2Q3ra3DBC5vBT1oP7PTj4C0+CcL8c7C2Ctejq
huCnuIQHaKHzvcRfZpnylFfXsYJx3pNLwhKzRAwAhEqG0SpusBHfAKkxw3w4627MPhoCH798z7s0ZnBJ/MEJbZSbXPhER2ih7p2ok/zSj2cEJDd4CAe+5WYn
BCgR2uruyEw6zRoW6/DWJ/OeAP8pd/BGtzOZKpG8oke0SX6GMmRk6GFlyAc59K32OTEinILRJRchah8HQwND8N435Z9Z0FY1EqtxUg+0SO6RJ/mmXz4VuS+D
pxXC3gXmZwIL7dBSH4zKE50wESf8qwVgrP1EIlTO5JP9Igu0aexdh28F1lmAEGJGfh7jE6ElyM5Rw/FDcYJjWhbeiBYoYNIpc2FT/SILivp0F1ipDWk4BIEo
2VuodEJUifhbiltnNBIXPUFCMpthtAyqws/BPlEF/VbaIxErdxPphsU7rcCp8DohC+GvBIPJS/tW2jtvTmmAeuNO8BNOYQeG8G/2OzCJ3q+soYB5i6NhMaKr
17FSal7GIHheuV3uSCY8qYVuEm1cOzqdWr7ku/R0BDoTT+DT+ohCM6/CCvKLKO4RI+dXPeAuaMqksaKrZ7L3FE5FIFbkIceeOZ2OcHO6wIhTkNo0ffgjRGxE
qogXHYUPHfWAC/lADpwGcLRY3aeK4/oRGCKYcZXPVoeX/kelVYY8dUGf8V5EBRbgJXT5QIPhP9ePJi428JKOiEYhYXFBqou2Guh+p/mEB1/RfMw6rY7cxcjT
rneI1FrDyuzUSRm9miwEJx8E/gUmqlyvHGkneiwErR21F3tNOK5Tf0yXaT+O7DgCvALTUBXdM4YhC/IawPU+2PduqMvuaR6eoxSwUk75ggqsYJ7VicsnwGIk
ZBSXKOUww73WGXyqP+J2/b9c+gi1YAg/xpwck3gJuucNrh5JvDPvQr0WFXf0piyt8f8/WI0hV4pRxxkQZdJDfDJNOAmM0Ag8jyT6hz0WGXWuP94Yh2jcfjmX
AGvHCMslRimDHYuHuDsy2QtHuIavznhbYURq5R57KpzBBRZKPJi8eQg48h4j8SDdowifdIrEVdU+gbO6QNvRRt4ZBthUaZhUnjlYObNagV3keoeru3rU7rcu
ceqU1mJBxy+BWZYlNEBH+0eH4vRiB+OYybU2hnblYlTvkHinM4m54YnxSyaZYSF6R3jwgP7udKLGIX6r/lbNa9N6y5MFynjWDtrHd75ZvTYAPO/6RgF0k76m
Qla3FGq7dO+cH8sKn0Vo7nDllwAhqwLPkxrHwWmHJOo+AKJ4rab5OgrM7rVu8eWb2Pu0Dh4eDgXoOfvp7Y7QeqknRmvcTBEyq9m/HQQSCSz6LHq3z0yzsNyS
RfMS253wl2KyRDbcZPcfJKjZmSEOjcxyi+Y8dUOtsIEH6R2wNykdqrkYJ0RV92H0W58pkfQk7cKevsLK10Py8SdMGfXNXATY+pPbyJR/ET6n9nIfztNtZYRV
9XniQu9IA2vOVgy4ir7GCLVmmd+zjkH0eAF9Po6K61pmCXHxU5rHMYd1ftc3owjwRSVRzLjKvqZEty6cRUD7jGqiOdu5HG6MdHjNcNYGqfDm5YRzLBBCCDl/
2bk8a8gdbqcfwECu62Fg/HrggAAAABJRU5ErkJggg==",d="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAC5E
lEQVRYw+2YW4/TMBCF45S0S1luXZCABy5CgLQgwf//S4BYBLTdJLax0fFqmB07nnQfEGqkIydpVH85M+NLjPe++dcPc4Q8Qh4hj5D/AaQJx6H/4TMwB0PeBN
wU7EGQAmAtsNfAzoZkgIa0ZgLMa4Aj6CxIAsjhjOCoL5z7Glg1JAOkaicgvQBXuncwJAWjksLtBTWZe04CnYRktUGdilALppZBOgHGZcBzL6OClABvMSVIzy
BjazOgrvACf1ydC5mguqAVg6RhdkSWQFj2uxfaq/BrIZOLEWgZdALIDvcMcZLD8ZbLC9de4yR1sYMi4G20S4Q/PWeJYxTOZn5zJXANZHIxAd4JWhPIloTJZh
zMQduM89WQ3MUVAE/RnhAXpTycqys3NZALOBbB7kFrgLesQl2h45Fcj8L1tTSohUwuxhy8H/Qg6K7gIs+3kkaigQCOcyEXCHN07wyQazhrmIulvKMQAwMcmL
NqyCVyMAI+BuxSMeTk3OPikLY2J1uE+VHQk6ANrhds+tNARqBeaGc72cK550FP4WhXmFmcMGhTwAR1ifOe3EvPqIegFmF+C8gVy0OfAaWQPMR7gF1OQKqGoB
jq90HPMP01BUjPOqGFksC4emE48tWQAH0YmvOgF3DST6xieJgHAWxPAHMuNhrImIdvoNOKNWIOcE+UXE0pYAnkX6uhWsgVXDxHdTfCmrEEmMB2zMFimLVOti
iajxiGWrbU52EeCdyOwPEQD8LqyPH9Ti2kgYMf4OhSKB7qYILbBv3CuVTJ11Y80oaseiMWOONc/Y7kJYe0xL2f0BaiFTxknHO5HaMGMublKwxFGzYdWsBF17
4H/QDknhTHmHHN39iWFnkZx8lPyM8WHfYELmlLKtgWNmFNzQcC1b47gJ4hL19i7o65dhH0Negbca8vONZoP7doIeOC9zXm8RjuL0Gf4d4OYaU5ljo3GYiqzr
WQHfJxA6ALhDpVKv9qYeZA8eM3EhfPSCmpuD0AAAAASUVORK5CYII=";return e(a)&&e(a.iconUrl)?new L.Icon(a):new L.Icon.Default({icon
Url:b,shadowUrl:d,iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]})},q=function(a){e(o[a])&&o
.splice(a,1)},r=function(){o={}},s=function(a,b,c){if(a.closePopup(),e(c)&&e(c.overlays))for(var d in
c.overlays)if((c.overlays[d]instanceof L.LayerGroup||c.overlays[d]instanceof
L.FeatureGroup)&&c.overlays[d].hasLayer(a))return void c.overlays[d].removeLayer(a);if(e(o))for(var f in
o)o[f].hasLayer(a)&&o[f].removeLayer(a);b.hasLayer(a)&&b.removeLayer(a)},t=function(b,c){b.openPopup();var f=b.getPopup(
),g=angular.isFunction(c.getMessageScope)?c.getMessageScope():a,h=e(c.compileMessage)?c.compileMessage:!0;if(e(f)){var i
=function(a){a._updateLayout(),a._updatePosition()};if(h)if(d(f._contentNode)(g),e(f._contentNode)&&f._contentNode.inner
HTML.indexOf("ngInclude")>-1)var j=g.$on("$includeContentLoaded",function(){i(f),j()});else i(f)}k.LabelPlugin.isLoaded(
)&&e(c.label)&&e(c.label.options)&&c.label.options.noHide===!0&&(h&&d(b.label._container)(g),b.showLabel())};return{rese
tMarkerGroup:q,resetMarkerGroups:r,deleteMarker:s,manageOpenPopup:t,createMarker:function(a){if(!e(a))return void
c.error("[AngularJS - Leaflet] The marker definition is not valid.");var b={icon:p(a.icon),title:e(a.title)?a.title:"",d
raggable:e(a.draggable)?a.draggable:!1,clickable:e(a.clickable)?a.clickable:!0,riseOnHover:e(a.riseOnHover)?a.riseOnHove
r:!1,zIndexOffset:e(a.zIndexOffset)?a.zIndexOffset:0,iconAngle:e(a.iconAngle)?a.iconAngle:0};for(var d in
a)a.hasOwnProperty(d)&&!b.hasOwnProperty(d)&&(b[d]=a[d]);var f=new L.marker(a,b);return
l(a.message)||f.unbindPopup(),f},addMarkerToGroup:function(a,b,d,g){return l(b)?f.isLoaded()?(e(o[b])||(o[b]=new
L.MarkerClusterGroup(d),g.addLayer(o[b])),void o[b].addLayer(a)):void c.error("[AngularJS - Leaflet] The MarkerCluster
plugin is not loaded."):void c.error("[AngularJS - Leaflet] The marker group you have specified is invalid.")},listenMar
kerEvents:function(a,b,c,d){a.on("popupopen",function(){d?j(c,function(){b.focus=!0}):t(a,b)}),a.on("popupclose",functio
n(){d&&j(c,function(){b.focus=!1})})},addMarkerWatcher:function(a,b,d,f,g){var
h=d.$watch('markers["'+b+'"]',function(b,d){if(!e(b))return s(a,g,f),void h();if(e(d)){if(!m(b.lat)||!m(b.lng))return
c.warn("There are problems with lat-lng data, please verify your marker model"),void s(a,g,f);var i=b===d;if(e(b.iconAng
le)&&d.iconAngle!==b.iconAngle&&a.setIconAngle(b.iconAngle),l(b.layer)||l(d.layer)&&(e(f.overlays[d.layer])&&f.overlays[
d.layer].hasLayer(a)&&(f.overlays[d.layer].removeLayer(a),a.closePopup()),g.hasLayer(a)||g.addLayer(a)),(m(b.opacity)||m
(parseFloat(b.opacity)))&&b.opacity!==d.opacity&&a.setOpacity(b.opacity),l(b.layer)&&d.layer!==b.layer){if(l(d.layer)&&e
(f.overlays[d.layer])&&f.overlays[d.layer].hasLayer(a)&&f.overlays[d.layer].removeLayer(a),a.closePopup(),g.hasLayer(a)&
&g.removeLayer(a),!e(f.overlays[b.layer]))return void c.error("[AngularJS - Leaflet] You must use a name of an existing
layer");var j=f.overlays[b.layer];if(!(j instanceof L.LayerGroup||j instanceof L.FeatureGroup))return void
c.error('[AngularJS - Leaflet] A marker can only be added to a layer of type "group" or "featureGroup"');j.addLayer(a),g
.hasLayer(a)&&b.focus===!0&&t(a,b)}if(b.draggable!==!0&&d.draggable===!0&&e(a.dragging)&&a.dragging.disable(),b.draggabl
e===!0&&d.draggable!==!0&&(a.dragging?a.dragging.enable():L.Handler.MarkerDrag&&(a.dragging=new L.Handler.MarkerDrag(a),
a.options.draggable=!0,a.dragging.enable())),n(b.icon)||n(d.icon)&&(a.setIcon(p()),a.closePopup(),a.unbindPopup(),l(b.me
ssage)&&a.bindPopup(b.message,b.popupOptions)),n(b.icon)&&n(d.icon)&&!angular.equals(b.icon,d.icon)){var o=!1;a.dragging
&&(o=a.dragging.enabled()),a.setIcon(p(b.icon)),o&&a.dragging.enable(),a.closePopup(),a.unbindPopup(),l(b.message)&&a.bi
ndPopup(b.message,b.popupOptions)}!l(b.message)&&l(d.message)&&(a.closePopup(),a.unbindPopup()),k.LabelPlugin.isLoaded()
&&e(b.label)&&e(b.label.message)&&!angular.equals(b.label.message,d.label.message)&&a.updateLabelContent(b.label.message
),l(b.message)&&!l(d.message)&&a.bindPopup(b.message,b.popupOptions),l(b.message)&&l(d.message)&&b.message!==d.message&&
a.setPopupContent(b.message);var q=!1;b.focus!==!0&&d.focus===!0&&(a.closePopup(),q=!0),(b.focus===!0&&(!e(d.focus)||d.f
ocus===!1)||i&&b.focus===!0)&&(t(a,b),q=!0),d.zIndexOffset!==b.zIndexOffset&&a.setZIndexOffset(b.zIndexOffset);var r=a.g
etLatLng(),u=l(b.layer)&&k.MarkerClusterPlugin.is(f.overlays[b.layer]);u?q?(b.lat!==d.lat||b.lng!==d.lng)&&(f.overlays[b
.layer].removeLayer(a),a.setLatLng([b.lat,b.lng]),f.overlays[b.layer].addLayer(a)):r.lat!==b.lat||r.lng!==b.lng?(f.overl
ays[b.layer].removeLayer(a),a.setLatLng([b.lat,b.lng]),f.overlays[b.layer].addLayer(a)):b.lat!==d.lat||b.lng!==d.lng?(f.
overlays[b.layer].removeLayer(a),a.setLatLng([b.lat,b.lng]),f.overlays[b.layer].addLayer(a)):n(b.icon)&&n(d.icon)&&!angu
lar.equals(b.icon,d.icon)&&(f.overlays[b.layer].removeLayer(a),f.overlays[b.layer].addLayer(a)):(r.lat!==b.lat||r.lng!==
b.lng)&&a.setLatLng([b.lat,b.lng])}},!0)}}}]),angular.module("leaflet-
directive").factory("leafletHelpers",["$q","$log",function(a,b){function c(a,c){var d,e;if(angular.isDefined(c))d=c;else
if(0===Object.keys(a).length)d="main";else if(Object.keys(a).length>=1)for(e in a)a.hasOwnProperty(e)&&(d=e);else
0===Object.keys(a).length?d="main":b.error("[AngularJS - Leaflet] - You have more than 1 map on the DOM, you must
provide the map ID to the leafletData.getXXX call");return d}function d(b,d){var e,f=c(b,d);return angular.isDefined(b[f
])&&b[f].resolvedDefer!==!0?e=b[f].defer:(e=a.defer(),b[f]={defer:e,resolvedDefer:!1}),e}return{isEmpty:function(a){retu
rn 0===Object.keys(a).length},isUndefinedOrEmpty:function(a){return
angular.isUndefined(a)||null===a||0===Object.keys(a).length},isDefined:function(a){return
angular.isDefined(a)&&null!==a},isNumber:function(a){return angular.isNumber(a)},isString:function(a){return
angular.isString(a)},isArray:function(a){return angular.isArray(a)},isObject:function(a){return
angular.isObject(a)},isFunction:function(a){return angular.isFunction(a)},equals:function(a,b){return
angular.equals(a,b)},isValidCenter:function(a){return angular.isDefined(a)&&angular.isNumber(a.lat)&&angular.isNumber(a.
lng)&&angular.isNumber(a.zoom)},isValidPoint:function(a){return angular.isDefined(a)?angular.isArray(a)?2===a.length&&an
gular.isNumber(a[0])&&angular.isNumber(a[1]):angular.isNumber(a.lat)&&angular.isNumber(a.lng):!1},isSameCenterOnMap:func
tion(a,b){var c=b.getCenter(),d=b.getZoom();return a.lat&&a.lng&&c.lat.toFixed(4)===a.lat.toFixed(4)&&c.lng.toFixed(4)==
=a.lng.toFixed(4)&&d===a.zoom?!0:!1},safeApply:function(a,b){var
c=a.$root.$$phase;"$apply"===c||"$digest"===c?a.$eval(b):a.$apply(b)},obtainEffectiveMapId:c,getDefer:function(a,b){var
e,f=c(a,b);return e=angular.isDefined(a[f])&&a[f].resolvedDefer!==!1?a[f].defer:d(a,b)},getUnresolvedDefer:d,setResolved
Defer:function(a,b){var d=c(a,b);a[d].resolvedDefer=!0},AwesomeMarkersPlugin:{isLoaded:function(){return
angular.isDefined(L.AwesomeMarkers)&&angular.isDefined(L.AwesomeMarkers.Icon)?!0:!1},is:function(a){return
this.isLoaded()?a instanceof L.AwesomeMarkers.Icon:!1},equal:function(a,b){return
this.isLoaded()&&this.is(a)?angular.equals(a,b):!1}},PolylineDecoratorPlugin:{isLoaded:function(){return
angular.isDefined(L.PolylineDecorator)?!0:!1},is:function(a){return this.isLoaded()?a instanceof
L.PolylineDecorator:!1},equal:function(a,b){return
this.isLoaded()&&this.is(a)?angular.equals(a,b):!1}},MakiMarkersPlugin:{isLoaded:function(){return
angular.isDefined(L.MakiMarkers)&&angular.isDefined(L.MakiMarkers.Icon)?!0:!1},is:function(a){return this.isLoaded()?a
instanceof L.MakiMarkers.Icon:!1},equal:function(a,b){return
this.isLoaded()&&this.is(a)?angular.equals(a,b):!1}},ExtraMarkersPlugin:{isLoaded:function(){return
angular.isDefined(L.ExtraMarkers)&&angular.isDefined(L.ExtraMarkers.Icon)?!0:!1},is:function(a){return this.isLoaded()?a
instanceof L.ExtraMarkers.Icon:!1},equal:function(a,b){return
this.isLoaded()&&this.is(a)?angular.equals(a,b):!1}},LabelPlugin:{isLoaded:function(){return
angular.isDefined(L.Label)},is:function(a){return this.isLoaded()?a instanceof
L.MarkerClusterGroup:!1}},MarkerClusterPlugin:{isLoaded:function(){return
angular.isDefined(L.MarkerClusterGroup)},is:function(a){return this.isLoaded()?a instanceof
L.MarkerClusterGroup:!1}},GoogleLayerPlugin:{isLoaded:function(){return
angular.isDefined(L.Google)},is:function(a){return this.isLoaded()?a instanceof
L.Google:!1}},ChinaLayerPlugin:{isLoaded:function(){return
angular.isDefined(L.tileLayer.chinaProvider)}},HeatMapLayerPlugin:{isLoaded:function(){return
angular.isDefined(L.TileLayer.WebGLHeatMap)}},BingLayerPlugin:{isLoaded:function(){return
angular.isDefined(L.BingLayer)},is:function(a){return this.isLoaded()?a instanceof
L.BingLayer:!1}},WFSLayerPlugin:{isLoaded:function(){return void 0!==L.GeoJSON.WFS},is:function(a){return
this.isLoaded()?a instanceof L.GeoJSON.WFS:!1}},AGSLayerPlugin:{isLoaded:function(){return void 0!==lvector&&void
0!==lvector.AGS},is:function(a){return this.isLoaded()?a instanceof
lvector.AGS:!1}},YandexLayerPlugin:{isLoaded:function(){return angular.isDefined(L.Yandex)},is:function(a){return
this.isLoaded()?a instanceof L.Yandex:!1}},DynamicMapLayerPlugin:{isLoaded:function(){return void 0!==L.esri&&void
0!==L.esri.dynamicMapLayer},is:function(a){return this.isLoaded()?a instanceof
L.esri.dynamicMapLayer:!1}},GeoJSONPlugin:{isLoaded:function(){return
angular.isDefined(L.TileLayer.GeoJSON)},is:function(a){return this.isLoaded()?a instanceof
L.TileLayer.GeoJSON:!1}},UTFGridPlugin:{isLoaded:function(){return angular.isDefined(L.UtfGrid)},is:function(a){return
this.isLoaded()?a instanceof L.UtfGrid:(b.error("[AngularJS - Leaflet] No UtfGrid plugin
found."),!1)}},CartoDB:{isLoaded:function(){return
cartodb},is:function(){return!0}},Leaflet:{DivIcon:{is:function(a){return a instanceof
L.DivIcon},equal:function(a,b){return this.is(a)?angular.equals(a,b):!1}},Icon:{is:function(a){return a instanceof
L.Icon},equal:function(a,b){return this.is(a)?angular.equals(a,b):!1}}}}}])}();
