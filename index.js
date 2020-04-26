const express = require('express');
const routes = require('./routes');
const path = require ('path');

require('dotenv').config({path: 'variables.env'});

const app = express();

/****Habilitar EJS como Template Engine*******/
app.set('view engine', 'ejs');
// Ubicacion Vistas
app.set('views', path.join(__dirname, './views'));
/*************Rutas*****************/
app.use('/', routes());

/*********Puerto de escucha************/
app.listen(process.env.PORT, () => {
    console.log('Express en Marcha');
});
