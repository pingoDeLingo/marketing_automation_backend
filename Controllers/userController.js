const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../data/database.sql');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    await connection.connect();
    
    const query = 'SELECT * FROM users WHERE email = ?';
    const user = await connection.query(query, [email]);

    if (user.length > 0) {
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user[0].password);

      if (passwordMatch) {
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
  } finally {
    await connection.end();
  }
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    await connection.connect();

    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    const existingUser = await connection.query(checkEmailQuery, [email]);

    if (existingUser.length > 0) {
      res.status(409).json({ message: 'Email already registered' });
    } else {
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);

      const registerQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
      const result = await connection.query(registerQuery, [email, hashedPassword]);

      res.status(201).json({ message: 'Registration successful', userId: result.insertId });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await connection.end();
  }
});

module.exports = router;
