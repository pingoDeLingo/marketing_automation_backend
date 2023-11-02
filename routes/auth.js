const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
import pool from '/data/database.js';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const user = await pool.query(query, [email]);

    if (user.length > 0) {
      const passwordMatch = await bcrypt.compare(password, user[0].password);

      if (passwordMatch) {
        req.session.user = email;
        req.session.active = true;
        res.status(200).json({ message: 'Login successful', user: user[0] });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    const existingUser = await pool.query(checkEmailQuery, [email]);

    if (existingUser.length > 0) {
      res.status(409).json({ message: 'Email already registered' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const registerQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
      const result = await pool.query(registerQuery, [email, hashedPassword]);

      req.session.user = email;
      req.session.active = true;

      res.status(201).json({ message: 'Registration successful', userId: result.insertId });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/logout', (req, res) => {
  if (req.session && req.session.user && req.session.active) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Logout successful');
      }
    });
  } else {
    res.status(401).send('Not logged in');
  }
});

module.exports = router;
