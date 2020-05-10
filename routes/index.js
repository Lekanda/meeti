const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');


module.exports = function() {
    // Ruta para el home
    router.get('/', homeController.home);

    // Rutas para Crear y Confirmar Cuentas
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearNuevaCuenta);
    router.get('/confirmar-cuenta/:correo', usuariosController.confirmarCuenta);

    
    
    // Ruta Iniciar Sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);
    
    
    // Panel de adminstracion
    router.get('/administracion', 
        authController.usuarioAutenticado,
        adminController.panelAdministracion
    );
    


    return router;
}


