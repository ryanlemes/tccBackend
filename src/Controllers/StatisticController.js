const HttpStatus = require('http-status-codes');
const Moment = require('moment');
const Calibration = require('../Models/Calibration');

module.exports = {
  /**
     * @swagger
     * api/v1/statistic/dailycalibration/:
     *   get:
     *     description: Return the daily calibration for some user.
     *     tags: [Statistics]
     *     responses:
     *       200:
     *         description: a json with the daily calibration.
     *       400:
     *         description: Resquest params error.
     *       500:
     *         description: Internal server error.
     */
  async dailyCalibration(req, res) {
    const idUser = req.userId;
    const lastMonth = new Date();

    lastMonth.setDate(lastMonth.getDate() - 30);

    await Calibration
      .find({
        $and: [
          { idUser },
          { createdAt: { $gt: lastMonth } },
        ],
      }, 'createdAt', (err, calibration) => {
        if (err) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ message: 'Data calibration not found for that user.' });
        }

        const countDates = calibration.map((e) => Moment(e.createdAt).get('date'))
          .reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

        return res
          .status(HttpStatus.OK)
          .json(countDates);
      });
  },
};
