const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../models/user');
const { generateToken } = require('../utils/authUtils');

async function signup(req, res) {
  try {
    const { emailAddress, password } = req.body;
    const existingUser = await findUserByEmail(emailAddress);
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await createUser(emailAddress, hashedPassword);
    const token = generateToken({ userId: newUser.userId });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function login(req, res) {
  try {
    const { emailAddress, password } = req.body;
    const user = await findUserByEmail(emailAddress);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken({ userId: user.userId });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  signup,
  login,
};
