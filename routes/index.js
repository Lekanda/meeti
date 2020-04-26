const express = require('express');
const router = express.Router();


module.exports = function() {
    // Ruta para el home
    router.get('/', (req,res) => {
        res.render('home');
    });
    router.get('/crear-cuenta', (req,res) => {
        res.render('crear-cuenta');
    });
    return router;
}


