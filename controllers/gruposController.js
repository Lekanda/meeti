const Categorias = require('../models/Categorias');
const Grupos = require('../models/Grupos');
const multer = require('multer');
const shortid = require('shortid');
const { body, validationResult } = require('express-validator');

// ****************MULTER*********************
const configuracionMulter = {
    limits : { fileSize : 100000 },// 100KB
    storage: fileStorage = multer.diskStorage({
        destination: (req,file, next) => {
            next(null, __dirname+'/../public/uploads/grupos/');
        },
        filename: (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,next) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            // El formato de imagen es valido
            next(null, true);
        }else{
            // El Formato de imagen no es valido
            next(new Error('Formato no valido', false));
        }
    }
}
const upload = multer(configuracionMulter).single('imagen');

// Sube la imagen al servidor
exports.subirImagen = (req,res,next)=> {
    upload(req,res, function(error) {
        if(error) {
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'Tamaño de imagen muy grande . Max 100 KB');
                }else {
                    req.flash('error', error.message);
                }
            }else if(error.hasOwnProperty('message')){
                req.flash('error', error.message);
            }
            res.redirect('back');
            return;
        }else{
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

    // leer la imagen, Sí hay imagen que asignar
    if(req.file) {
        grupo.imagen = req.file.filename;
    }

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


exports.formEditarGrupo = async (req,res) => {
    const consultas = [];
    consultas.push(Grupos.findByPk(req.params.grupoId));
    consultas.push(Categorias.findAll());
    // Promise con await
    const [grupo, categorias] = await Promise.all(consultas);

    // A la vista
    res.render('editar-grupo', {
        nombrePagina: `Editar Grupo: ${grupo.nombre}`,
        grupo,
        categorias
    })
}

// Cambios en datos grupos se guaradn en la DB
exports.editarGrupo = async (req,res, next) => {
    const grupo = await Grupos.findOne({ where : {id : req.params.grupoId , usuarioId : req.user.id}});

    //Sí no existe ese grupo o no es el dueño
    if(!grupo) {
        req.flash('error', 'Operacion no valida');
        res.redirect('/administracion');
        return next();
    }

    // Todo bien leer los valores desde req.body
    // console.log(req.body);
    const { nombre, descripcion, categoriaId, url } = req.body;
    
    // Asignar los valores
    grupo.nombre = nombre;
    grupo.descripcion = descripcion;
    grupo.categoriaId = categoriaId;
    grupo.url = url;

    //Guardar en la DB
    await grupo.save();// Guarda en la DB
    req.flash('exito', 'Se ha editado el grupo correctamente');
    res.redirect('/administracion');
}


// Muestra el formulario para editar la imagen
exports.formEditarImagen = async (req,res,next) => {
    const grupo = await Grupos.findByPk(req.params.grupoId);
    // console.log(grupo);
    res.render('imagen-grupo',{
        nombrePagina: `Editar Imagen Grupo: ${grupo.nombre}`,
        grupo
    });
    
}