const Grupos = require('../models/Grupos');
const Meeti = require('../models/Meeti');

const { v4: uuidv4 } = require('uuid');
// const uuid = require('uuid/v4');

// Muestra el formulario para nuevos Meetis
exports.formNuevoMeeti = async (req,res,next) => {
    const grupos = await Grupos.findAll({ where: {usuarioId: req.user.id} });
    res.render('nuevo-meeti', {
        nombrePagina: 'Nuevo Meeti',
        grupos
    });
}

// Guarda los Meetis en la DB
exports.crearMeeti = async (req,res,next) => {
    // obtener los datos
    const meeti = req.body;

    // asignar el usuario
    meeti.usuarioId = req.user.id;
    
    // almacena la ubicación con un point
    const point = { type : 'Point', coordinates : [ parseFloat(req.body.lat), parseFloat(req.body.lng) ] };
    meeti.ubicacion = point;

    // cupo opcional
    if(req.body.cupo === '') {
        meeti.cupo = 0;
    }

    meeti.id = uuidv4();
    console.log(meeti);

    // almacenar en la BD
    try {
        await Meeti.create(meeti);
        req.flash('exito', 'Se ha creado el Meeti Correctamente');
        res.redirect('/administracion');
    } catch (error) {
        console.log(error);
        // extraer el message de los errores
        const erroresSequelize = error.errors.map(err => err.message);
        req.flash('error', erroresSequelize);
        res.redirect('/nuevo-meeti');
    }
    
}