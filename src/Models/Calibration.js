const mongoose = require('mongoose');

/**
 * @swagger
 *
 * definitions:
 *   calibration:
 *     type: object
 *     required:
 *       - idUser
 *       - idEquipment
 *       - value
 *     properties:
 *       idUser:
 *         type: string
 *       idEquipment:
 *         type: string
 *       value:
 *         type: string
 *
 *   responseCalibration:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       idUser:
 *         type: string
 *       idEquipment:
 *         type: string
 *       value:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */

const CalibrationSchema = new mongoose.Schema({
  value: String,
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
