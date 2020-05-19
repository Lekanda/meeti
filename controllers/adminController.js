const Grupos = require('../models/Grupos');
const Meeti = require('../models/Meeti');
const moment = require('moment');
const Sequelize = require('Sequelize');
const Op = Sequelize.Op

exports.panelAdministracion = async (req,res) => {
    console.log(new Date());
    console.log(moment(new Date()).format("YYYY-MM-DD"));
    

    // Consultas
    const consultas = [];
    consultas.push(Grupos.findAll({where: { usuarioId : req.user.id }}) );
    consultas.push(Meeti.findAll({where: { usuarioId : req.user.id,
    fecha : {[Op.gte]: moment(new Date()).format("YYYY-MM-DD")}
    }}) );


    // Array destructuring
    const [grupos, meeti] = await Promise.all(consultas);


    res.render('administracion', {
        nombrePagina: 'Panel de Administracion',
        grupos,
        meeti,
        moment
    })
}