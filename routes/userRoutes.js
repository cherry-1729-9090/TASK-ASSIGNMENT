const express = require('express');
const router = express.Router();

const { getUsers, removeUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');  // Import the roleMiddleware

router.get('/getAllUsers/', authMiddleware, getUsers);
router.get('/getUser/:userId', authMiddleware, roleMiddleware(['Admin']), getUsers);
router.delete('/:userId', authMiddleware, roleMiddleware(['Admin']), removeUser);

module.exports = router;
