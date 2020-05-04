const HttpStatus = require('http-status-codes');
const Equipment = require('../Models/Equipment');

module.exports = {
  /**
   * @swagger
   * /api/v1/equipment/:
   *   post:
   *     description: store a new Equipment
   *     tags: [Equipment]
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: equipment
   *         description: equipment object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/equipment'
   *     responses:
   *       201:
   *         description: returns a json with the stored Equipment.
   *         schema:
   *           type: object
   *           $ref: '#/definitions/responseEquipment'
   *       400:
   *         description: Resquest params error.
   *       500:
   *         description: Internal server error.
   */
  async store(req, res) {
    const {
      name, defaultCalibration,
    } = req.body;

    try {
      const equipment = await Equipment.create({
        name, defaultCalibration,
      });

      return res.status(HttpStatus.CREATED).json(equipment);
    } catch (ex) {
      return res
        .status(ex.status)
        .json({ message: `Error on create. message ${ex.message}` });
    }
  },
};
