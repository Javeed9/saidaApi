const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const jwtToken = req?.headers?.authorization || null;
    if (!jwtToken) return res?.sendStatus(401)
    const token = jwtToken.split('jwt ')[1]
    jwt.verify(token, "Muhamm@dTech", (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
          }
          return res.sendStatus(403);
        }
        next();
      });
}

module.exports = authenticateToken