const HttpStatus = require('http-status-codes');
const Calibration = require('../Models/Calibration');

module.exports = {
  /**
     * @swagger
     * api/v1/statistic/dailycalibration/{id}:
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
    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 30);

    const calibration = await Calibration
      .find({ createdAt: { $gt: lastMonth } }, 'createdAt');

    const datenow = calibration.map((e) => {
      const date = new Date(e.createdAt);
      return date.getMonth();
    }).reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    return res.json(datenow);
  },
};
