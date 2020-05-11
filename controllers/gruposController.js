const Categorias = require('../models/Categorias');
const Grupos = require('../models/Grupos');

const { body, validationResult } = require('express-validator');

exports.formNuevoGrupo = async (req,res) => {
    const categorias = await Categorias.findAll();
    res.render('nuevo-grupo', {
        nombrePagina: 'Crea un nuevo grupo',
        categorias
    })
}

// Almacena los grupos en la DB
exports.crearGrupo = async (req,res) => {
    // Sanitizar campos
    body('nombre');
    body('url');

    
    
    const grupo = req.body;
    // console.log(grupo);

    // Almacena el usuario autenticado como el creador del grupo
    grupo.usuarioId = req.user.id;
    // Almacena la categoria como unica categoria de grupo (solo puede tener una)
    // grupo.categoriaId = req.body.categoria;

    try {
        // Almacenar en la DB
        await Grupos.create(grupo);
        req.flash('exito', 'Se ha guardado el grupo');
        res.redirect('/administracion');
    } catch (error) {
        // console.log(error);
        // Extraer el message de los errores de Sequelize
        const erroresSequelize = error.errors.map(err => err.message);
        req.flash('error', erroresSequelize);
        res.redirect('/nuevo-grupo');
    }
}