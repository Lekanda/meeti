const axios = require('axios');
import Swal from 'sweetalert2'

document.addEventListener('DOMContentLoaded', () => {
    const formsEliminar = document.querySelectorAll('.eliminar-comentario');

    // Revisar que existan los formularios
    if(formsEliminar.length > 0) {
        formsEliminar.forEach(form => {
            form.addEventListener('submit', eliminarComentario);
        });
    }
});

function eliminarComentario(e) {
    e.preventDefault();
    // console.log(this.action);
    axios.post(this.action)
        .then(respuesta => {
            console.log(respuesta);
        })
    
}