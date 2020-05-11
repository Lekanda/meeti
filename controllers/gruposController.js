const Categorias = require('../models/Categorias');
const Grupos = require('../models/Grupos');
const multer = require('multer');
const shortid = require('shortid');
const { body, validationResult } = require('express-validator');

// ****************MULTER*********************
const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req,file, next) => {
            next(null, __dirname+'/../public/uploads/grupos/');
        },
        filename: (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    })
}
const upload = multer(configuracionMulter).single('imagen');

// Sube la imagen al servidor
exports.subirImagen = (req,res,next)=> {
    upload(req,res, function(error) {
        if(error) {
            console.log(error);
            
            //TODO Manejar errores
        }else {
            next();
        }
    })
}

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

    // leer la imagen
    grupo.imagen = req.file.filename;

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