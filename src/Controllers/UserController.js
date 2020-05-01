const HttpStatus = require('http-status-codes');
const User = require('../Models/User');

module.exports = {
  /**
   * @swagger
   * api/v1/user/{id}:
   *   get:
   *     description: Show's the User profile
   *     tags: [User]
   *     responses:
   *       200:
   *         description: returns the user profile
   *       400:
   *         description: Resquest params error.
   *       500:
   *         description: Internal server error.
   */
  async show(req, res) {
    try {
      const user = User.findById(req.params.id);

      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'User not found',
        });
      }

      return res.status(HttpStatus.OK).json(user);
    } catch (ex) {
      return res
        .status(ex.status)
        .json({ message: `Error on delete. message ${ex.message}` });
    }
  },
  /**
   * @swagger
   * api/v1/user/:
   *   post:
   *     description: Create a new user
   *     tags: [User]
   *     responses:
   *       201:
   *         description: returns a created user
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

    let user = await User.findOne({ cpf });

    if (user) {
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ message: 'Cpf already exists.' });
    }

    user = null;

    user = await User.findOne({ username });

    if (user) {
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ message: 'Username already exists.' });
    }

    user = null;

    user = await User.findOne({ email });

    if (user) {
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ message: 'Email already exists.' });
    }

    try {
      user = await User.create({
        name, cpf, address, username, email, password, picture,
      });

      return res.status(HttpStatus.OK).json(user);
    } catch (ex) {
      return res
        .status(ex.status)
        .json({ message: `Error on create. message ${ex.message}` });
    }
  },
  /**
   * @swagger
   * api/v1/user/{id}:
   *   put:
   *     description: Update the user information
   *     tags: [User]
   *     responses:
   *       200:
   *         description: returns the user information updated.
   *       400:
   *         description: Resquest params error.
   *       500:
   *         description: Internal server error.
   */
  async update(req, res) {
    const user = User.findById(req.params.id);
    const { email } = req.body;

    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          message: 'User not found.',
        });
    }

    if (email !== undefined || email !== '') {
      const validationMail = User.findOne({ email });

      if (validationMail) {
        return res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json({ message: 'Email already exists.' });
      }

      user.email = req.body.email;
    }

    if (req.body.name !== undefined || req.body.name !== '') {
      user.name = req.body.name;
    }

    if (req.body.address !== undefined || req.body.address !== '') {
      user.address = req.body.address;
    }

    if (req.body.picture !== undefined || req.body.picture !== '') {
      user.picture = req.body.picture;
    }

    try {
      await user.save();

      return res.status(HttpStatus.OK).json(user);
    } catch (ex) {
      return res
        .status(ex.status)
        .json({ message: `Error on update. message ${ex.message}` });
    }
  },
  /**
   * @swagger
   * api/v1/user/{id}:
   *   delete:
   *     description: Remove user from database
   *     tags: [User]
   *     responses:
   *       200:
   *         description: returns a information if the user was deleted.
   *       400:
   *         description: Resquest params error.
   *       500:
   *         description: Internal server error.
   */
  async remove(req, res) {
    try {
      const user = User.findById(req.params.id);

      if (!user) {
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
  },
};
