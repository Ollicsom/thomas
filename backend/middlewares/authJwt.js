const jwt = require('jsonwebtoken');

// Validate the authenticity of a JWT token if there is one
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({
            message: 'No token provided !',
        });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        console.log(err);
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized !',
            });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = {
    verifyToken,
};
