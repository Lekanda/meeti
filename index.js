const express = require('express');
const routes = require('./routes');
const path = require ('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const expressValidator = require('express-validator');
const passport = require('./config/passport');



// Configuracion para la DB
const db = require('./config/db');
require('./models/Usuarios');
require('./models/Categorias');
require('./models/Grupos');
require('./models/Meetis');
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

// Express validator (validación con bastantes funciones)
// app.use(expressValidator());


/****Habilitar EJS como Template Engine*******/
app.use(expressLayouts);
app.set('view engine', 'ejs');
// Ubicacion Vistas
app.set('views', path.join(__dirname, './views'));


/***********Archivos Estaticos**************/
app.use(express.static('public'));


/***********Habilitar Cookie-Parser**************/
app.use(cookieParser());
/***********Habilitar Express-Session************/
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized : false
}));

/************INICIALIZAR PASSPORT*********/
app.use(passport.initialize());
app.use(passport.session());

/***********Connect-Flash**************/
app.use(flash());


/****Mi Middleware(usuario logeado, flash mss, fecha actual)****/
app.use((req,res,next) => {
    res.locals.mensajes = req.flash();
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
