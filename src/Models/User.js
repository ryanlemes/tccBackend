const mongoose = require('mongoose');

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
