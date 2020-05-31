const Meeti = require('../../models/Meeti');
const Grupos = require('../../models/Grupos');
const Usuarios = require('../../models/Usuarios');

const moment = require('moment');



exports.mostrarMeeti = async (req,res) => {
    const meeti = await Meeti.findOne(
        { where : { 
            slug : req.params.slug
        },
        
        include : [
            {
                model : Grupos
            },
            {
                model: Usuarios,
                attributes: ['id', 'nombre', 'imagen']
            }
        ]
    });

    // Sí no existe redireccionar
    if (!meeti) {
        res.redirect('/')
    }

    // Pasar el resultado a la vista
    res.render('mostrar-meeti', {
        nombrePagina: `${meeti.titulo}`,
        meeti,
        moment
    })
}


//Confirma o cancela sí el usuario asistira a un Meeti
exports.confirmarAsistencia = async(req,res) => {
    console.log('Hola');
    
}