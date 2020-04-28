const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(60),
    imagen: Sequelize.STRING(60),
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            isEmail: { msg : 'Agrega un correo valido'}
        },
        unique : {
            args: true,
            msg: 'eMail Registrado'
        }
    },
    password: {
            type: Sequelize.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El Password no puede ir vacio'
                }
            }
    },
    activo: {
            type: Sequelize.INTEGER,
            defaultValue: 0
    },
    tokenPassword: Sequelize.STRING,
    expiraToken: Sequelize.DATE 
},{
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10), null);
        }
    }
});

// Metodo para comparar los Passwords
Usuarios.prototype.validarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = Usuarios;