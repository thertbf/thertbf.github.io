'use strict';

// Europe Map in Homepage
var myGeoJSONPath = '../data/europe.geo.json';
var geojsonLayer;

// Interaction logic from https://jsfiddle.net/eaj6h/11/
function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    dashArray: '',
    fillColor: '#4f58ff',
    fillOpacity: 1
  });

  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
  }

  // show country name label
  var countryName = e.target.feature.properties.name;
  $('#country-name').css('display', 'block');
  $('#country-name div').text(countryName);
}

function resetHighlight(e) {
  geojsonLayer.resetStyle(e.target);

  // hide country name label
  $('#country-name').css('display', 'none');
}

function countryClick(e) {
  var code = e.target.feature.properties.iso_a2.toLowerCase();
  var url = '/en/country/' + code;
  window.location = url;
}

function onEachFeature(feature, layer) {
  if ($.inArray(feature.properties.iso_a2, country_codes) != -1) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: countryClick
    });
  }
  // make features accessible by id
  // https://stackoverflow.com/a/28618177
  layer._leaflet_id = feature.id;
}

function conditionalStyle(feature) {
  // http://gis.stackexchange.com/a/75686
  if ($.inArray(feature.properties.iso_a2, country_codes) != -1) {
    return {
      stroke: true,
      color: '#ddd',
      weight: 1,
      opacity: 1,
      fill: true,
      fillColor: '#4f58ff',
      fillOpacity: 0.7,
      className: 'active-cursor'
    };
  } else {
    return {
      stroke: true,
      color: '#ddd',
      weight: 1,
      opacity: 1,
      fill: true,
      fillColor: '#b4bbf3',
      fillOpacity: 0.7
    };
  }
}

$.getJSON(myGeoJSONPath, function (data) {
  console.log(data);
  console.log(country_codes);
  var map = L.map('map', {
    center: [58.5377, 22.3958],
    maxBounds: [[90, 180], [-90, -180]],
    scrollWheelZoom: false,
    touchZoom: false,
    doubleClickZoom: false,
    zoomControl: false,
    dragging: false,
    boxZoom: false,
    zoom: 3.2
  });

  geojsonLayer = L.geoJson(data, {
    clickable: true,
    style: conditionalStyle,
    onEachFeature: onEachFeature
  });
  geojsonLayer.addTo(map);
});
//# sourceMappingURL=main.js.map
