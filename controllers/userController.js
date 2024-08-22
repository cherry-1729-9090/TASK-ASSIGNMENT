const { User } = require('../models');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Fetching users failed' });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.destroy({ where: { user_id: userId } });
    res.status(200).json({ message: 'User removed' });
  } catch (err) {
    res.status(500).json({ error: 'Removing user failed' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Fetching user failed' });
  }
};
