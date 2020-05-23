const Usuarios = require('../models/Usuarios');
const { body, check, validationResult} = require('express-validator');
const enviarEmail = require('../handlers/emails');


exports.formCrearCuenta = (req,res) => {
    res.render('crear-cuenta', {
        nombrePagina:'Crear Cuenta'
    });
}


// /****************** Version Nueva ^6.2.0 ********************/
// /*****************   CREAR NUEVA CUENTA    *******************/
exports.crearNuevaCuenta = async (req,res) => {
    const usuario = req.body;

    //**************Reglas y Sanityze****************
    const rules = [   
        check('nombre').not().isEmpty().withMessage('El nombre es obligatorio').escape(),
    
        check('email').isEmail().normalizeEmail().withMessage('Poner email valido').escape(),
        
        check('password').not().isEmpty().withMessage('Password no puede ir vacío').escape(),
    
        check('confirmar').equals(usuario.password).withMessage('El password es diferente').escape(),
    ];

    //***********Ejecutar Validaciones Express***********
    await Promise.all(rules.map( validation => validation.run(req)));
    // Meter en "errores" los errores de Express-Validator
    const errores = validationResult(req);
    
    
    try {
        // Sí no hay errores de validacion (Express y Sequelize) crea el Usuario
        await Usuarios.create(usuario);


        // URL de confirmacion
        const url = `http://${req.headers.host}/confirmar-cuenta/${usuario.email}`;


        // Enviar email de confirmación
        await enviarEmail.enviarEmail({
            usuario,
            url, 
            subject : 'Confirma tu cuenta de Meeti',
            archivo : 'confirmar-cuenta'
        });

        req.flash('exito', 'Hemos enviado un E-mail, confirma tu cuenta');
        res.redirect('/iniciar-sesion'); 

    } catch (error) {
        // "ERROR" tiene los errores de validacion de Sequelize solo

        // Extraer el message de los errores de Sequelize
        const erroresSequelize = error.errors.map(err => err.message);
        // console.log(erroresSequelize);
        
        
        // Extraer el msg de los errores de Express-Validator
        const errExp = errores.array().map(err => err.msg);
        // console.log(errExp);
        
        
        // Unir los mensajes message y msg
        const listaErrores = [...errExp, ...erroresSequelize];// La suma de los 2
        // [...array] = Pone al final del Array listaErrores
        console.log(listaErrores);
        

        req.flash('error', listaErrores);
        res.redirect('/crear-cuenta');
    }
};


//Confirmacion de suscrpicion de Usuario
exports.confirmarCuenta = async (req,res, next) => {
    // Verificar que el usuario existe
    const usuario = await Usuarios.findOne({ where : {email: req.params.correo } });

    // console.log(req.params.correo);
    // console.log(usuario);
    
    // Si no existe, redireccionar
    if(!usuario) {
        req.flash('error', 'No Existe esa cuenta');
        res.redirect('/crear-cuenta');
        return next();
    }

    // Sí Existe, confirmar subscripcion y redireccionar
    // console.log(usuario.activo);
    usuario.activo = 1;
    await usuario.save();
    req.flash('exito', 'La Cuenta se ha Confirmado inicia sesion');
    res.redirect('/iniciar-sesion');
    

}

// Formulario Iniciar_sesion
exports.formIniciarSesion = (req,res) => {
    res.render('iniciar-sesion', {
        nombrePagina:'Iniciar Sesion'
    });
}

// Muestra el Formulario para Editar Perfil
exports.formEditarPerfil = async(req,res,next) =>  {
    const usuario = await Usuarios.findByPk(req.user.id);

    res.render('editar-perfil', {
        nombrePagina : `Editar Perfil : ${usuario.nombre}`,
        usuario
    })
}


// Almacena en la DB los cambios en el Perfil
exports.editarPerfil = async(req,res,next) => {
    const usuario = await Usuarios.findByPk(req.user.id);

    body('nombre');
    body('email');

    // Leer datos del form
    const { nombre, descripcion, email } = req.body;
    
    // Asignar los valores
    usuario.nombre = nombre;
    usuario.descripcion =descripcion;
    usuario.email = email;
   
    // Guardar en la DB
    await usuario.save();
    req.flash('exito', 'Cambios en perfil guardados');
    res.redirect('/administracion');
}