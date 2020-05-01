const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  cpf: String,
  address: String,
  username: String,
  email: String,
  picture: String,
  lastAccess: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
