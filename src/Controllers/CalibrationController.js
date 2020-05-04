const HttpStatus = require('http-status-codes');
const Calibration = require('../Models/Calibration');

module.exports = {
  /**
   * @swagger
   * api/v1/calibration/user/equipment/{id}:
   *   get:
   *     description: Return the last user calibration on a specific equipment.
   *     tags: [Calibration]
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: id
   *         description: Equipment id
   *         in:  query
   *         required: true
   *         type: number
   *     responses:
   *       200:
   *         description: a json with the last user application
   *                      access date.
   *         schema:
   *           type: object
   *           $ref: '#/definitions/responseCalibration'
   *       400:
   *         description: Resquest params error.
   *       500:
   *         description: Internal server error.
   */
  async lastUserCalibration(req, res) {
    try {
      const { userid } = req;
      const equipmentId = req.params.id;

      const calibration = await Calibration.find({
        $and: [
          { idUser: userid },
          { idEquipment: equipmentId },
        ],
      }).sort('-createdAt');

      if (!calibration) {
        return res.status(HttpStatus.OK).json({ message: 'Hasnt any itens.' });
      }

      return res.status(HttpStatus.OK).json(calibration[0]);
    } catch (ex) {
      return res
        .status(ex.status)
        .json({ message: `Error on delete. message ${ex.message}` });
    }
  },
  /**
   * @swagger
   * api/v1/calibration/equipment/{id}:
   *   get:
   *     description: Return the last calibration with the user that
   *                  made the calibration on a specific equipment.
   *     tags: [Calibration]
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: id
   *         description: Equipment id
   *         in:  query
   *         required: true
   *         type: number
   *     responses:
   *       200:
   *         description: returns a json with the last calibration date
   *                      and his user id.
   *         schema:
   *           type: object
   *           $ref: '#/definitions/responseCalibration'
   *       400:
   *         description: Resquest params error.
   *       500:
   *         description: Internal server error.
   */
  async equipmentCalibration(req, res) {
    try {
      const idEquipment = req.params.id;

      const calibration = await Calibration.find({ idEquipment }).sort('-createdAt');

      if (!calibration) {
        return res
          .status(HttpStatus.OK)
          .json({ message: 'Hasnt any itens.' });
      }

      return res
        .status(HttpStatus.OK)
        .json(calibration[0]);
    } catch (ex) {
      return res
        .status(ex.status)
        .json({ message: `Error on delete. message ${ex.message}` });
    }
  },
  /**
   * @swagger
   * api/v1/calibration/:
   *   post:
   *     description: store a new calibration
   *     tags: [Calibration]
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: Calibration
   *         description: calibration object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/calibration'
   *     responses:
   *       201:
   *         description: returns a json with the stored calibration.
   *         schema:
   *           type: object
   *           $ref: '#/definitions/responseCalibration'
   *       400:
   *         description: Resquest params error.
   *       500:
   *         description: Internal server error.
   */
  async store(req, res) {
    const {
      idUser, idEquipment, value,
    } = req.body;

    try {
      const calibration = await Calibration.create({
        idUser, idEquipment, value,
      });

      return res.status(HttpStatus.CREATED).json(calibration);
    } catch (ex) {
      return res
        .status(ex.status)
        .json({ message: `Error on create. message ${ex.message}` });
    }
  },
};
