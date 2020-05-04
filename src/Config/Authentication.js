const jwt = require('jsonwebtoken');
const AuthConfig = require('./auth.json');

module.exports = (params = {}) => jwt.sign(params, AuthConfig.secret, { expiresIn: 86400 });
