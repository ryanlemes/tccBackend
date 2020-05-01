const mongoose = require('mongoose');

const CalibrationSchema = new mongoose.Schema({
  valor: Number,
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  idEquipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Calibration', CalibrationSchema);
