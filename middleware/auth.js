const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        jwt.verify(req.token, 'secretkey', (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.userId = data._id;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
};

module.exports = verifyToken;
