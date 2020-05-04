const mongoose = require('mongoose');

/**
 * @swagger
 *
 * definitions:
 *   equipment:
 *     type: object
 *     required:
 *       - name
 *       - defaultCalibration
 *     properties:
 *       name:
 *         type: string
 *       defaultCalibration:
 *         type: string
 *
 *   responseEquipment:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 *       defaultCalibration:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */
const EquipmentSchema = new mongoose.Schema({
  name: String,
  defaultCalibration: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
