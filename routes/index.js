const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const usuariosController = require('../controllers/usuariosController');


module.exports = function() {
    // Ruta para el home
    router.get('/', homeController.home);
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);


    return router;
}


