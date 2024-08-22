const Sequelize = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Task = require('./Task')(sequelize, Sequelize.DataTypes);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Task = Task;

db.User.hasMany(db.Task, { as: 'createdTasks', foreignKey: 'userId' });
db.Task.belongsTo(db.User, { as: 'creator', foreignKey: 'userId' });

db.User.hasMany(db.Task, { as: 'assignedTasks', foreignKey: 'assigneeId' });
db.Task.belongsTo(db.User, { as: 'assignee', foreignKey: 'assigneeId' });

// Sync all defined models to the DB.
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch((err) => {
        console.error("Error creating database tables: ", err);
    });

module.exports = db;
