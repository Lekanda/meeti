const Comentarios = require('../../models/Comentarios');

exports.agregarComentario = async ( req,res,next)=> {
    // console.log(req.body);


    // Obtener el comentario
    const { comentario } = req.body;

    // Crear comentarioen la DB
    await Comentarios.create({
        mensaje: comentario,
        usuarioId: req.user.id,
        meetiId: req.params.id  
    });

    // Redireccionar a la vista
    res.redirect('back');
    next();

    
}


// Elimina un comentario de la DB
exports.eliminarComentario = async(req,res,next) => {
    res.send('Hola');
}