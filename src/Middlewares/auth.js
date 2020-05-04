const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const authSecret = require('../Config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) { return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No token provider.' }); }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token format error.' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token malformatted.' });

  jwt.verify(token, authSecret.secret, (err, decoded) => {
    if (err) return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token invalid.' });

    req.userId = decoded.id;
    return next();
  });
};
