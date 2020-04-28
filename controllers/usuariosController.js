const Usuarios = require('../models/Usuarios');


exports.formCrearCuenta = (req,res) => {
    res.render('crear-cuenta', {
        nombrePagina:'Crear Cuenta'
    });
}

exports.crearNuevaCuenta = async (req,res) => {
    const usuario = req.body;
    // console.log(usuario);
    try {
        const nuevoUsuario = await Usuarios.create(usuario);

        // TODO : Flash MSS y Redireccionar

        console.log('Usuario Creado', nuevoUsuario);
        res.redirect('/iniciar-sesion');

    } catch (error) {
        console.log(error);
        res.redirect('/crear-cuenta');

    }
}