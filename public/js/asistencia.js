const axios = require('axios').default;

document.addEventListener('DOMContentLoaded', () => {
    const asistencia = document.querySelector('#confirmar-asistencia');
    if(asistencia) {
        asistencia.addEventListener('submit', confirmarAsistencia);
    }

});

function confirmarAsistencia (e) {
    e.preventDefault();
    // console.log(this);
    axios.post(this.action)
        .then(respuesta => {
            console.log(respuesta);
        })
}