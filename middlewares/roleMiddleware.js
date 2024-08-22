module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;  // Assuming req.user is populated with the authenticated user's data

        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden: You do not have access to this resource.' });
        }

        next();
    };
};
