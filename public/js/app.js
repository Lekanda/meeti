// Codigo para mostrar el mapa de Leaflet
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const lat = 43.12717;
const lng = -2.76615;


const map = L.map('map').setView([lat, lng], 23);

document.addEventListener('DOMContentLoaded', () => {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/    copyright">OpenStreetMap</a> contributors'
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
            // console.log(resultado);
            // Agregar el Pin
            
        })
    }
}


// L.marker([43.1272, -2.767]).addTo(map)
//     .bindPopup('Iturriotz Barrena.<br> Dima Bizkaia.')
//     .openPopup('prueba');

L.marker([lat, lng]).addTo(map)
    .bindPopup('Iturriotz Barrena.<br> Dima Bizkaia.')
    .openPopup();