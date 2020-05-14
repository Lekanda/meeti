// Codigo para mostrar el mapa de Leaflet
// GIST de Leaflet https://gist.github.com/Lekanda/1c39b4e5752395939f751d7b36777762
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const lat = 43.12717;
const lng = -2.76615;
const map = L.map('map').setView([lat, lng], 12);
let marker; // Global por que se usa en varios




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

        // Utilizar el provider
        const provider = new OpenStreetMapProvider();
        // console.log(provider);
        provider.search({ query: e.target.value }).then((resultado) => {
            console.log(resultado);
            //Mostrar el mapa
            map.setView(resultado[0].bounds[0], 15);
            // Agregar el Pin
            marker = new L.marker(resultado[0].bounds[0], {
                draggable: true, // Para mover el PIN
                autoPan: true // Para mover el mapa
            })
            .addTo(map)// Añade el PIN al Mapa
            .bindPopup(resultado[0].label)
            .openPopup()
        })
    }
}


// L.marker([43.1272, -2.767]).addTo(map)
//     .bindPopup('Iturriotz Barrena.<br> Dima Bizkaia.')
//     .openPopup('prueba');
