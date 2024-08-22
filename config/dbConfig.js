const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_assignment', 'root', 'Nani@9090', {
    host: '127.0.0.1',
    dialect: 'mysql',
});

module.exports = sequelize;
