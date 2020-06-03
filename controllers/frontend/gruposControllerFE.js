const Grupos = require('../../models/Grupos');
const Meeti = require('../../models/Meeti');
const moment = require('moment');

exports.mostrarGrupo = async(req,res,next) => {
    const consultas = [];
    consultas.push(Grupos.finOne({ where : { id : req.params.id }}));
    consultas.push(Meeti.finAll({ where : { grupoId : req.params.id },
                                  order : [
                                      ['fecha', 'ASC', ]
                                  ]
    }));

    const [grupo, meetis] = await Promise.all(consultas);

    // Sí no hay grupo
    if (!grupo) {
        res.render('/');
        return next();
    }

    // Mostrar la vista
    res.render('mostrar-grupo', {
        nombrePagina: `Grupo ${grupo.nombre}`,
        grupo,
        meetis
    })

}