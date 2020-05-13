// Codigo para mostrar el mapa de Leaflet
var map = L.map('map').setView([43.1272, -2.767], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([43.1272, -2.767]).addTo(map)
    .bindPopup('Iturriotz Barrena.<br> Dima Bizkaia.')
    .openPopup('prueba');

L.marker([43.1692, -2.587]).addTo(map)
    .bindPopup('Iturriotz Barrena.<br> Dima Bizkaia.')
    .openPopup();