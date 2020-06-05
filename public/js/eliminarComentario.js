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

    Swal.fire({
        title: 'Eliminar Comentario?',
        text: "No se puede recuperar una vez borrado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borralo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {

            // Tomar el id del comentario
            const comentarioId = this.children[0].value;
            console.log(comentarioId);

            // Crear el objeto
            const datos = {
                comentarioId
            }

            // Ejecutar Axios y pasar los datos


            axios.post(this.action, datos) // El 1º la URL; el 2º los datos que se pasan
                .then((respuesta) => {
                    console.log(respuesta);
                });
            Swal.fire(
                'Borrado!',
                'Tu comentario ha sido borrado.',
                'success'
            )
    }
    })
}