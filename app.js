// code sourced from tutorial: https://medium.com/@timndichu/getting-started-with-leaflet-js-and-react-rendering-a-simple-map-ef9ee0498202


// Wait for the document to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Create a map instance and set the initial view coordinates and zoom level
    var map = L.map('map').setView([41.6031, -93.6546], 16);
  
  
    // Add a tile layer to the map from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
  
    // Create a marker with popup and add it to the map
    var marker = L.marker([41.60125424269539, -93.6542833229665]).addTo(map);    marker.bindPopup("Cowles Library");  
    var marker = L.marker([41.60308611862731, -93.65805650557472]).addTo(map);    marker.bindPopup("Stalnaker Residence Hall");  
    var marker = L.marker([41.6036236318801, -93.657852657711]).addTo(map);    marker.bindPopup("Crawford Residence Hall"); 
    var marker = L.marker([41.6038723305267, -93.65718746994511]).addTo(map);    marker.bindPopup("Carpenter Residence Hall"); 
  });