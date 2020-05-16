const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/Usuarios');


passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
    },
    async (email, password, next) => {
        // Se ejecuta al llenar el formulario
        const usuario = await Usuarios. findOne({ 
            where: { email , activo : 1 } });

        // Revisar sí existe o no
        if(!usuario) return next(null, false, {
            message: ' Ese Usuario no existe'
        }) ;

        // El Usuario existe, comparar el password
        const verificarPass = usuario.validarPassword(password);

        // Sí el password es incorrecto
        if(!verificarPass) return next(null, false, {
                message: 'Password incorrecto'
        });

        // Sí el password es correcto
        return next(null, usuario);
    }
))


passport.serializeUser(function(usuario, cb) {
    cb(null, usuario);
});

passport.deserializeUser(function(usuario, cb) {
    cb(null, usuario);
});


module.exports = passport;
