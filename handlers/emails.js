const nodemailer = require('nodemailer');
const emailConfig = require('../config/emails');
// FILE SISTEM(fs) = Para acceder a los archivos y sus contenidos.Ya existe en NODEJS
const fs = require('fs');
const util = require('util');// Es parte de NODEJS
const ejs = require('ejs');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass
    }
});

exports.enviarEmail = async(opciones) => {
    console.log(opciones);
    
    const opcionesEmail = {
        from: 'devJobs <no-reply@devjobs.com>',
        to: opciones.usuario.email,
        subject: opciones.subject,
        template: opciones.archivo,
        context: {
            resetUrl: opciones.resetUrl
        }
    }
    const sendMail = util.promisify(transport.sendMail, transport);
    return sendMail.call(transport, opcionesEmail);
}
