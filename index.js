const express = require('express');
const routes = require('./routes');
const path = require ('path');
const expressLayouts = require('express-ejs-layouts');

require('dotenv').config({path: 'variables.env'});

const app = express();

/****Habilitar EJS como Template Engine*******/
app.use(expressLayouts);
app.set('view engine', 'ejs');
// Ubicacion Vistas
app.set('views', path.join(__dirname, './views'));

/***********Archivos Estaticos**************/
app.use(express.static('public'));

/****Mi Middleware(usuario logeado, flash mss, fecha actual)****/
app.use((req,res,next) => {
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
});

/*************Rutas*****************/
app.use('/', routes());

/*********Puerto de escucha************/
app.listen(process.env.PORT, () => {
    console.log('Express en Marcha');
});
