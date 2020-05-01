const HttpStatus = require('http-status-codes');

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
    return res.status(HttpStatus.OK);
  },
};
