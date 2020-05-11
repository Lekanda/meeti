const Categorias = require('../models/Categorias');
const Grupos = require('../models/Grupos');

exports.formNuevoGrupo = async (req,res) => {
    const categorias = await Categorias.findAll();
    res.render('nuevo-grupo', {
        nombrePagina: 'Crea un nuevo grupo',
        categorias
    })
}

// Almacena los grupos en la DB
exports.crearGrupo = async (req,res) => {
    const grupo = req.body;
    // console.log(grupo);
    try {
        // Almacenar en la DB
        await Grupos.create(grupo);
        req.flash('exito', 'Se ha guardado el grupo');
        res.redirect('/administracion');
    } catch (error) {
        console.log(error);
        req.flash('error', error);
        res.redirect('/nuevo-grupo');
    }
}