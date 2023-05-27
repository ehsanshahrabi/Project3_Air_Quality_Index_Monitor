<><div id='map' style='height:380px;' /><link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.5/leaflet.css" /><script src="http://cdn.leafletjs.com/leaflet-0.7.5/leaflet.js"></script><script>
    var  OSM_URL  =  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var  OSM_ATTRIB  =  '&copy;  <a href="http://openstreetmap.org/copyright">OpenStreetMap</a>  contributors';
    var  osmLayer  =  L.tileLayer(OSM_URL,  {attribution}:  OSM_ATTRIB});

    var  WAQI_URL    =  "https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=cfec51e63370e90b7880950705e8add14a2602b6";
    var  WAQI_ATTR  =  'Air  Quality  Tiles  &copy;  <a href="http://waqi.info">waqi.info</a>';
    var  waqiLayer  =  L.tileLayer(WAQI_URL,  {attribution}:  WAQI_ATTR});

    var  map  =  L.map('map').setView([51.505,  -0.09],  11);
    map.addLayer(osmLayer).addLayer(waqiLayer);
</script></>