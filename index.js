const express = require('express');
const routes = require('./routes');
const path = require ('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');


// Configuracion para la DB
const db = require('./config/db');
require('./models/Usuarios');
db.sync()
    .then(() => console.log('Conectado a la DB'))
    .catch(error => console.log(error));


 // Path para variables.env   
require('dotenv').config({path: 'variables.env'});

// Instanciar Express en app
const app = express();

// BodyParser para leer formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
    console.log('Servidor Express en Marcha');
});
