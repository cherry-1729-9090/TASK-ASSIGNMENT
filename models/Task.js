module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        taskId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('ToDo', 'inProgress', 'Completed'),
            defaultValue: 'ToDo',
        },
        priority: {
            type: DataTypes.ENUM('Low', 'Medium', 'High'),
            defaultValue: 'Medium',
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        assigneeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,  // This will automatically add `createdAt` and `updatedAt` fields
    });

    return Task;
};
