const HttpStatus = require('http-status-codes');
const Calibration = require('../Models/Calibration');

module.exports = {
  /**
   * @swagger
   * api/v1/user/calibration/{id}:
   *   get:
   *     description: Return the last user calibration on a specific equipment.
   *     tags: [History]
   *     responses:
   *       200:
   *         description: a json with the last user application
   *                      access date.
   *       400:
   *         description: Resquest params error.
   *       500:
   *         description: Internal server error.
   */
  async lastUserCalibration(req, res) {
    try {
      const { userId } = req.headers;
      const equipmentId = req.params.id;

      const calibration = await Calibration.find({
        $and: [
          { idUser: userId },
          { idEquipment: equipmentId },
        ],
      });

      if (!calibration) {
        return res.status(HttpStatus.OK).json({});
      }

      return res.status(HttpStatus.OK).json(calibration);
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
   *     tags: [History]
   *     responses:
   *       200:
   *         description: returns a jsonthe last calibration date
   *                      and the user.
   *       400:
   *         description: Resquest params error.
   *       500:
   *         description: Internal server error.
   */
  async equipmentCalibration(req, res) {
    return res.status(HttpStatus.OK);
  },
  /**
   * @swagger
   * api/v1/calibration/:
   *   post:
   *     description: store a new calibration
   *     tags: [History]
   *     responses:
   *       200:
   *         description: returns a json with the stored calibration.
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

      return res.status(HttpStatus.OK).json(calibration);
    } catch (ex) {
      return res
        .status(ex.status)
        .json({ message: `Error on create. message ${ex.message}` });
    }
  },
};
