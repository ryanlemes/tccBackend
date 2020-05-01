const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  name: String,
  defaultCalibration: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
