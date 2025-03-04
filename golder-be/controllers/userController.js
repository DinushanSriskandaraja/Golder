const db = require('../config/database.config');

exports.getUserGold = (req, res) => {
  db.get('SELECT gold_holding FROM users WHERE id = ?', [req.userId], (err, row) => {
    if (err) return res.status(500).send('Database error');
    if (!row) return res.status(404).send('User not found');
    res.json({ gold: row.gold_holding });
  });
};