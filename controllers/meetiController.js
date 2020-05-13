const Grupos = require('../models/Grupos');



// Muestra el formulario para nuevos Meetis
exports.formNuevoMeeti = async (req,res,next) => {
    const grupos = await Grupos.findAll({ where: {usuarioId: req.user.id} });

    res.render('nuevo-meeti', {
        nombrePagina: 'Nuevo Meeti',
        grupos
    });
}