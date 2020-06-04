const Meeti = require('../../models/Meeti');
const Grupos = require('../../models/Grupos');
const Usuarios = require('../../models/Usuarios');
const Categorias = require('../../models/Categorias');

const Sequelize = require('sequelize');

const moment = require('moment');



exports.mostrarMeeti = async (req,res) => {
    const meeti = await Meeti.findOne(
        { where : { 
            slug : req.params.slug
        },
        include : [
            {
                model : Grupos
            },
            {
                model: Usuarios,
                attributes: ['id', 'nombre', 'imagen']
            }
        ]
    });

    // Sí no existe redireccionar
    if (!meeti) {
        res.redirect('/')
    }

    // Pasar el resultado a la vista
    res.render('mostrar-meeti', {
        nombrePagina: `${meeti.titulo}`,
        meeti,
        moment
    })
}


//Confirma o cancela sí el usuario asistira a un Meeti
exports.confirmarAsistencia = async(req,res) => {
    console.log(req.body);

    const { accion } = req.body;

    if (accion === 'confirmar') {
        // Agrega el Usuario
        Meeti.update(
            {'interesados' :  Sequelize.fn('array_append', Sequelize.col('interesados'), req.user.id  ) },
            {'where' : { 'slug' : req.params.slug }}
        );
        // Mensaje
        res.send('Has confirmado tu asistencia');
    }else {
        // Cancelar la asistencia de Usuario
        Meeti.update(
            {'interesados' :  Sequelize.fn('array_remove', Sequelize.col('interesados'), req.user.id  ) },
            {'where' : { 'slug' : req.params.slug }}
        );
        // Mensaje
        res.send('Has cancelado tu asistencia');
    }
}


// Mostrar Asistentes
exports.mostrarAsistentes = async (req,res) => {
    const meeti = await Meeti.findOne({
        where: { slug : req.params.slug },
        attributes : ['interesados']
    });
    // console.log(meeti);

    //Extraer interesados 
    const { interesados } = meeti;
    const asistentes = await Usuarios.findAll({
        attributes : ['nombre', 'imagen'],
        where : { id : interesados }
    })

    // console.log(asistentes);

    // Crear la vista y pasar datos
    res.render('asistentes-meeti', {
        nombrePagina : 'Asistentes a MEETI',
        asistentes
    })
    
    
}


// Muestra los Meetis agrupados por categoria
exports.mostrarCategoria = async (req,res,next) => {
    const categoria = await Categorias.findOne({ 
        attributes : ['id','nombre'],
        where : { slug : req.params.categoria }
    });

    const meetis = await Meeti.findAll({
        order : [
            ['fecha', 'ASC'],
            ['hora', 'ASC']
        ],
        include : [
            {
                model : Grupos,
                where : {categoriaId : categoria.id}
            },
            {
                model : Usuarios
            }
        ]
    });

    // Pasar a la vista
    res.render('categoria', {
        nombrePagina : `Categoria ${categoria.nombre}`,
        meetis,
        moment
    })
    
}
