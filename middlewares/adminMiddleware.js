const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).send({ error: 'Access denied.' });
    }
    next();
};

module.exports = adminMiddleware;
