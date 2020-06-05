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
    // console.log(req.body);

    // Tomar el ID del comentario
    const { comentarioId } = req.body;

    // Consultar el comentario
    const comentario = await Comentarios.findOne({ where: { id : comentarioId }});
    console.log(comentario);
    
    // Verificar sí existe el comentario
    if(!comentario) {
        res.send('Accion no valida');
        return next();
    }

    //Verificar que quien lo borra sea el creador
    if(comentario.usuarioId === req.user.id) {
        res.send(' Si es la persona correcta la que quiere borrar el comentario');
        return next();
    } else {
        res.send('Te crees Hacker?');
        return next();
    }
}