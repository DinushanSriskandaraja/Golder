const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database.config');

exports.register = async (req, res) => {
  const { nic, name, email, address, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
    db.run(
      'INSERT INTO users (nic, name, email, address, password) VALUES (?, ?, ?, ?, ?)',
      [nic, name, email, address, hashedPassword],
      (err) => {
        if (err) {
          if (err.message.includes('UNIQUE')) return res.status(400).send('Email or NIC already exists');
          return res.status(500).send('Database error');
        }
        res.status(201).send('Registered successfully');
      }
    );
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    try {
      if (err) return res.status(500).send('Database error');
      if (!row) return res.status(401).send('Invalid email or password');
      
      const match = await bcrypt.compare(password, row.password);
      if (!match) return res.status(401).send('Invalid email or password');
      
      const token = jwt.sign({ id: row.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
};