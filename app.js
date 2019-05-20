var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
});

var grayscalemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.grayscale",
    accessToken: API_KEY
});

var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
});

var baseMaps = {
    "Satellite": satellitemap,
    "Grayscale": grayscalemap,
    "Outdoors": outdoorsmap
};

var layers = {
    FAULT_LINES: new L.LayerGroup(),
    EARTHQUAKES: new L.LayerGroup()
};

var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 5,
    layers: [
        satellitemap,
        layers.FAULT_LINES,
        layers.EARTHQUAKES
    ]
});

var overlays = {
    "Fault Lines": layers.FAULT_LINES,
    "Earthquakes": layers.EARTHQUAKES
};

L.control.layers(baseMaps, overlays).addTo(myMap);

var info = L.control({
    position: "bottomright"
});

info.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    return div;
};

info.addTo(myMap);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(quakeData) {
    d3.json("PB2002_plates.json", function(platesData) {
        console.log(L.geoJson(quakeData))
        console.log(platesData)
    })
})