const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        console.log('Register Request Body:', req.body);

        const { password, user_name, ...userData } = req.body;

        const existingUser = await User.findOne({ where: { user_name } });
        if (existingUser) {
            return res.status(409).send({ error: 'Username already exists. Please choose a different username or create a new account.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ ...userData, user_name, password: hashedPassword });

        const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.status(201).send({ user, token });
    } catch (error) {
        console.error('Error in Register:', error);
        res.status(400).send({ error: error.message || 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { user_name, password, authorizationToken } = req.body;

        console.log('Login Request Body:', req.body);

        if (authorizationToken) {
            try {
                const decoded = jwt.verify(authorizationToken, process.env.JWT_SECRET);
                return res.status(200).send({ message: 'Token is valid', user: decoded });
            } catch (error) {
                return res.status(401).send({ error: 'Invalid or expired token. Please login again.' });
            }
        }

        const user = await User.findOne({ where: { user_name } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.send({ user, token });
    } catch (error) {
        console.error('Error in Login:', error);
        res.status(400).send({ error: error.message || 'Login failed' });
    }
};
