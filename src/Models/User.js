const mongoose = require('mongoose');

/**
 * @swagger
 *
 * definitions:
 *   loginUser:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *
 *   responseUser:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       name:
 *         type: string
 *       cpf:
 *         type: string
 *       address:
 *         type: string
 *       email:
 *         type: string
 *       picture:
 *         type: string
 *       lastAccess:
 *         type: string
 *
 *   postUser:
 *     allOf:
 *       - $ref: '#/definitions/responseUser'
 *     required:
 *       - username
 *       - password
 *       - name
 *       - cpf
 *       - address
 *       - email
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       name:
 *         type: string
 *       cpf:
 *         type: string
 *       address:
 *         type: string
 *       email:
 *         type: string
 *       picture:
 *         type: string
 *
 *   responseUserToken:
 *     type: object
 *     properties:
 *       user:
 *         type: object
 *         $ref: '#/definitions/responseUser'
 *       token:
 *        type: string
 */

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  address: String,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  picture: String,
  lastAccess: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
