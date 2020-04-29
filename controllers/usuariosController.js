const Usuarios = require('../models/Usuarios');
const { check, validationResult} = require('express-validator');


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
        check('nombre').not().isEmpty().withMessage('El nombre esObligatorio').escape(),
    
        check('email').isEmail().normalizeEmail().withMessage('El email valido').escape(),
        
        check('password').not().isEmpty().withMessage('Password no puede irvacío').escape(),
    
        check('confirmar').equals(usuario.password).withMessage('El password es diferente').escape(),
    ];

    //***********Ejecutar Validaciones Express***********
    await Promise.all(rules.map( validation => validation.run(req)));
    // Meter en "errores" los errores de Express-Validator
    const errores = validationResult(req);
    
    
    try {
        // Sí no hay errores de validacion (Express y Sequelize) crea el Usuario
        await Usuarios.create(usuario);
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

// Formulario Iniciar_sesion
exports.formIniciarSesion = (req,res) => {
    res.render('iniciar-sesion', {
        nombrePagina:'Iniciar Sesion'
    });
}