const HttpStatus = require('http-status-codes');
const Bcrypt = require('bcrypt');

const generateToken = require('../Config/Authentication');
const User = require('../Models/User');

module.exports = {
  /**
    * @swagger
    * /api/v1/user/:
    *   get:
    *     description: Show's the User profile
    *     tags: [User]
    *     security:
    *      - bearerAuth: []
    *     consumes:
    *      - application/json
    *     produces:
    *      - application/json
    *     responses:
    *       200:
    *         description: returns the user profile
    *         schema:
    *           type: object
    *           $ref: '#/definitions/responseUser'
    *       400:
    *         description: Resquest params error.
    *       500:
    *         description: Internal server error.
    */
  async show(req, res) {
    await User.findOne({ _id: req.userId }, (err, user) => {
      try {
        if (!user) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: `User not found. Message: ${err} `,
          });
        }

        return res.status(HttpStatus.OK).json(user);
      } catch (ex) {
        return res
          .status(ex.status)
          .json({ message: `Error on delete. message ${ex.message}` });
      }
    });
  },
  /**
  * @swagger
  * /api/v1/user/:
  *   post:
  *     description: Create a new user
  *     tags: [User]
  *     produces:
  *      - application/json
  *     parameters:
  *       - name: user
  *         description: User object
  *         in:  body
  *         required: true
  *         type: string
  *         schema:
  *           $ref: '#/definitions/postUser'
  *     responses:
  *       201:
  *         description: returns a created user
  *         schema:
  *           type: object
  *           $ref: '#/definitions/responseUserToken'
  *       400:
  *         description: Resquest params error.
  *       500:
  *         description: Internal server error.
  */
  async store(req, res) {
    const {
      name, cpf, address, username, email, password, picture,
    } = req.body;

    if (name === undefined || name === '') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Name property missing.' });
    }

    if (cpf === undefined || cpf === '') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Cpf property missing.' });
    }

    if (address === undefined || address === '') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Address property missing.' });
    }

    if (username === undefined || username === '') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Username property missing.' });
    }

    if (email === undefined || email === '') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Email property missing.' });
    }

    if (password === undefined || password === '') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Password property missing.' });
    }

    await User.findOne({ cpf }, (err, user) => {
      if (user) {
        return res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json({ message: 'Cpf already exists.' });
      }
    });

    await User.findOne({ username }, (err, user) => {
      if (user) {
        return res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json({ message: 'Username already exists.' });
      }
    });

    await User.findOne({ email }, (err, user) => {
      if (user) {
        return res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json({ message: 'Email already exists.' });
      }
    });

    try {
      const hash = await Bcrypt.hash(password, 10);

      const user = await User.create({
        name, cpf, address, username, email, password: hash, picture,
      });

      user.password = undefined;

      return res
        .status(HttpStatus.OK)
        .json({ user, token: generateToken({ id: user.id }) });
    } catch (ex) {
      return res
        .status(ex.status)
        .json({ message: `Error on create. message ${ex.message}` });
    }
  },
  /**
  * @swagger
  * /api/v1/user/:
  *   put:
  *     description: Update the user information
  *     tags: [User]
  *     security:
  *      - bearerAuth: []
  *     consumes:
  *      - application/json
  *     produces:
  *      - application/json
  *     parameters:
  *       - name: user
  *         description: User object
  *         in:  body
  *         required: true
  *         type: string
  *         schema:
  *           $ref: '#/definitions/postUser'
  *     responses:
  *       200:
  *         description: returns the user information updated.
  *         schema:
  *           type: object
  *           $ref: '#/definitions/responseUser'
  *       400:
  *         description: Resquest params error.
  *       500:
  *         description: Internal server error.
  */
  async update(req, res) {
    await User.findById(req.userId, async (err, user) => {
      const userCopy = user;

      if (err) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({
            message: 'User not found.',
          });
      }
      const { email } = req.body;

      if (email !== undefined && email !== '') {
        const validationMail = User.findOne({ email });

        if (validationMail) {
          return res
            .status(HttpStatus.NOT_ACCEPTABLE)
            .json({ message: 'Email already exists.' });
        }

        userCopy.email = req.body.email;
      }

      if (req.body.name !== undefined && req.body.name !== '') {
        userCopy.name = req.body.name;
      }

      if (req.body.address !== undefined && req.body.address !== '') {
        userCopy.address = req.body.address;
      }

      if (req.body.picture !== undefined && req.body.picture !== '') {
        userCopy.picture = req.body.picture;
      }
      try {
        await userCopy.save();

        return res.status(HttpStatus.OK).json(userCopy);
      } catch (ex) {
        return res
          .status(ex.status)
          .json({ message: `Error on update. message ${ex.message}` });
      }
    });
  },
  /**
   * @swagger
   * /api/v1/user/:
   *   delete:
   *     description: Remove user from database
   *     tags: [User]
   *     security:
   *      - bearerAuth: []
   *     consumes:
   *      - application/json
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: returns a information of the removed user.
   *         schema:
   *           type: object
   *           $ref: '#/definitions/responseUser'
   *       400:
   *         description: Resquest params error.
   *       500:
   *         description: Internal server error.
   */
  async remove(req, res) {
    await User.findById(req.userId, async (err, user) => {
      try {
        if (err) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: 'User not found',
          });
        }
        const removedUser = user;

        await user.remove();

        return res.status(HttpStatus.OK).json(removedUser);
      } catch (ex) {
        return res
          .status(ex.status)
          .json({ message: `Error on delete. message ${ex.message}` });
      }
    });
  },
};
