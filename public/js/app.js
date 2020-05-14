// Codigo para mostrar el mapa de Leaflet
// GIST de Leaflet https://gist.github.com/Lekanda/1c39b4e5752395939f751d7b36777762
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const lat = 43.12717;
const lng = -2.76615;
const map = L.map('map').setView([lat, lng], 12);
let markers = new L.FeatureGroup().addTo(map);// Contenedor para todos los markers
let marker; // Es el PIN .Global por que se usa en varios




document.addEventListener('DOMContentLoaded', () => {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.google.com">Lekanda.NET</a> Contribuciones'
    }).addTo(map);

    // Buscar la Direccion
    const buscador = document.querySelector('#formbuscador');
    buscador.addEventListener('input', buscarDireccion);
})


function buscarDireccion(e) {
    // console.log(e.target.value);
    if(e.target.value.length > 8) {
        // console.log('Buscando...');
        // Sí existe un PIN anterior limpiarlo
        markers.clearLayers();

        // Utilizar el provider y GeoCoder
        const geocodeService = L.esri.Geocoding.geocodeService();
        const provider = new OpenStreetMapProvider();
        // console.log(provider);
        provider.search({ query: e.target.value }).then((resultado) => {
            geocodeService.reverse().latlng(resultado[0].bounds[0], 15).run(function(error, result) {
                console.log(result);

                // console.log(resultado);
                //Mostrar el mapa
                map.setView(resultado[0].bounds[0], 15);
                // Agregar el Pin
                marker = new L.marker(resultado[0].bounds[0], {
                    draggable: true, // Para mover el PIN
                    autoPan: true // Para mover el mapa
                })
                .addTo(map)// Añade el PIN al Mapa
                .bindPopup(resultado[0].label)// Añadir Globo de Informacion
                .openPopup();// Globo de Informacion

                // Asignar al contenedor Markers(PINes)
                markers.addLayer(marker);

                // Detectar movimiento del Marker
                marker.on('moveend', function(e) {// Coge la posicion final del PIN al moverlo
                    marker = e.target;
                    // console.log(marker.getLatLng());
                    const posicion = marker.getLatLng();
                    map.panTo(new L.LatLng(posicion.lat, posicion.lng));
                    // Centra el mapa al PIN  


                    // Reverse geocoding, cuando el usuario reubica el PIN
                    geocodeService.reverse().latlng(posicion, 15).run(function(error, result) {
                        console.log(result);
                        // Asigna los valores al Popup del Marker
                        marker.bindPopup(result.address.LongLabel);
                    });
                })
            })
        })
    }
}