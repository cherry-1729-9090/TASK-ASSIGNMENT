const express = require('express');

const { createTask, getTasks, updateTask, deleteTask, assignTask, getMyTasks } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/createTask', authMiddleware, createTask);
router.get('/getAllTasks', roleMiddleware(['Admin']), getTasks);
router.get('/:id', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);
router.post('/:id/assign', authMiddleware, assignTask);
router.get('/getMyTasks', authMiddleware, getMyTasks);

module.exports = router;
