const { Task, User } = require('../models');
const { Op } = require('sequelize');

exports.createTask = async (req, res) => {
    try {
        const { user_id, ...taskData } = req.body;  // Get user_id and task data from the request body

        const task = await Task.create({ ...taskData, createdBy: user_id });
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send({ error: error.message || 'Task creation failed' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 10, status, priority, dueDate, search } = req.query;

        const offset = (page - 1) * limit;

        let whereClause = {
            [Op.or]: [{ userId }, { assigneeId: userId }],
        };

        if (status) {
            whereClause.status = status;
        }

        if (priority) {
            whereClause.priority = priority;
        }

        if (dueDate) {
            whereClause.dueDate = dueDate;
        }

        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        const tasks = await Task.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.send({
            tasks: tasks.rows,
            totalItems: tasks.count,
            totalPages: Math.ceil(tasks.count / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(400).send({ error: error.message || 'Fetching tasks failed' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { user_id } = req.body;  // Get user_id from the request body
        const task = await Task.findOne({ where: { taskId: req.params.id, createdBy: user_id } });

        if (!task) return res.status(404).send({ error: 'Task not found or not authorized' });

        await task.update(req.body);
        res.send(task);
    } catch (error) {
        res.status(400).send({ error: error.message || 'Task update failed' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { user_id } = req.body;  // Get user_id from the request body
        const task = await Task.findOne({ where: { taskId: req.params.id, createdBy: user_id } });

        if (!task) return res.status(404).send({ error: 'Task not found or not authorized' });

        await task.destroy();
        res.send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message || 'Task deletion failed' });
    }
};

exports.assignTask = async (req, res) => {
    try {
        const { user_name, user_id } = req.body;  // Get the user_name of the assignee from the request body
        const assignee = await User.findOne({ where: { user_name } });

        if (!assignee) return res.status(404).send({ error: 'Assignee not found' });

        const task = await Task.findOne({ where: { taskId: req.params.id } });

        if (!task) return res.status(404).send({ error: 'Task not found' });

        task.assigneeId = assignee.user_id;
        task.userId = assignee.user_id;

        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send({ error: error.message || 'Task assignment failed' });
    }
};

exports.getMyTasks = async (req, res) => {
    try {
        const userId = req.user.id;  // Get user ID from the authenticated user
        const tasks = await Task.findAll({ where: { userId } });
        res.send(tasks);
    } catch (error) {
        res.status(400).send({ error: error.message || 'Fetching tasks failed' });
    }
};
