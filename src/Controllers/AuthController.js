const HttpStatus = require('http-status-codes');

module.exports = {
  /**
   * @swagger
   * api/v1/login:
   *   post:
   *     description: Realize the user's login
   *     tags: [Authorization]
   *     responses:
   *       200:
   *         description: returns the with a valid token
   *       400:
   *         description: Resquest params error.
   *       500:
   *         description: Internal server error.
   */
  async login(req, res) {
    return res.status(HttpStatus.OK);
  },
};
