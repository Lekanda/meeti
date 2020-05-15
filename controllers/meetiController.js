const Grupos = require('../models/Grupos');
const Meetis = require('../models/Meetis');

// const { v4: uuidv4 } = require('uuid');

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
    const meeti = req.body;
    console.log(req.user.id);
    
    // Asignar el Usuario
    meeti.usuarioId = req.user.id;
    // Almacena la ubicacion con un point
    const point = { type : 'Point', coordinates : [ parseFloat(req.body.lat), parseFloat(req.body.lng)]};
    meeti.ubicacion = point;
    // El cupo es opcional
    if(req.body.cupo === '') {
        meeti.cupo = 0;
    }
    
    // console.log(req.body);

    // Almacenar en la DB
    try {
        console.log('Esta en el TRY');
        
        await Meetis.create(meeti);
        req.flash('exito', 'Meeti guardado con exito');
        res.redirect('/administracion');
    } catch (error) {
        // console.log(error);
        console.log('Esta en el Ctach');
        // Extraer el message de los errores
        const erroresSequelize = error.errors.map(err => err.message);
        req.flash('error', erroresSequelize);
        res.redirect('/nuevo-meeti');
    }
    
}