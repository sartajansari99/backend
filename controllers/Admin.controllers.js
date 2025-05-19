const User = require('../models/Admin.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

async function registerAdmin(req, res) {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      photo: req.file ? req.file.path : null
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration successful', user: newUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error during registration' });
  }
}

async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ message: 'Login successful', token, user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error during login' });
  }
}

module.exports = { registerAdmin, loginAdmin};