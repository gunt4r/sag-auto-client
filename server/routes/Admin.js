/* eslint-disable no-undef */
import express from 'express';
import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password)
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({ username, password: hashedPassword });

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
    res.header("Authorization", token).status(201).json({ admin, token });
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(404).send('Admin not found');
    }

    const validPass = await bcrypt.compare(password, admin.password);
    if (!validPass) {
      return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
    console.log(token)
    res.header("Authorization", token).send(token);
  } catch (error) {
    console.error(error)
    return res.status(500).send('Something went wrong');
  }
});

router.get('/check', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
      if (err) {
          return res.status(401).json({ message: 'Invalid token' });
      }
      res.status(200).json({ message: 'Token is valid' });
  });
});
export default router;
