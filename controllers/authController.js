const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect : '/administracion',
    failureRedirect : '/iniciar-sesion',
    failureFlash : true,
    badRequestMessage : 'Ambos campos son Obligatorios'
});

// Revisa sí el Usuario esta Autenticado
exports.usuarioAutenticado = (req,res,next) => {
    // Sí el usuario esta Autenticado
    if (req.isAuthenticated()) {
        return next();
    }
    // Sí no esta Autenticado
    return res.redirect('/iniciar-sesion');
}