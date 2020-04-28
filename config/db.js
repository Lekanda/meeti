const Sequelize = require('sequelize');

module.exports = new Sequelize('meeti', 'postgres', 'root', {
    host: '127.0.0.1',
    port:'5432',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: true// Quita campos creados automaticamente(false), true los deja
    },
    logging: false // Quita mensajes SQL de la consola
});