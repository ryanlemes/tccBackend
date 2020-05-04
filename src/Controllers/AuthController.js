const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');

const generateToken = require('../Config/Authentication');
const User = require('../Models/User');

module.exports = {
  /**
    * @swagger
    * /api/v1/login/:
    *   post:
    *     description: Realize the user's login
    *     tags: [Authorization]
    *     produces:
    *      - application/json
    *     parameters:
    *       - name: Login
    *         description: User object
    *         in:  body
    *         required: true
    *         type: string
    *         schema:
    *           $ref: '#/definitions/loginUser'
    *     responses:
    *       200:
    *         description: Login user with the valid token.
    *         schema:
    *           type: object
    *           $ref: '#/definitions/responseUserToken'
    *       400:
    *         description: Resquest params error.
    *       500:
    *         description: Internal server error.
    */
  async login(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid password' });
    }

    user.password = undefined;

    return res
      .status(HttpStatus.OK)
      .json({ user, token: generateToken({ id: user.id }) });
  },
};
