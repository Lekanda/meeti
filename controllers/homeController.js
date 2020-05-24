const Categorias = require('../models/Categorias');


exports.home = async (req,res) => {

    //Promise para consultas de buscador (Busca un grupo en tu ciudad ) en el home
    const consultas = [];
    consultas.push( Categorias.findAll({}) );
    //Destructuring para extraer y pasar a la vista
    const [ categorias ] = await Promise.all(consultas)


    res.render('home', {
        nombrePagina:'Inicio',
        categorias
    });
};