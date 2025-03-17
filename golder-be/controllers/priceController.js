const db = require('../config/database.config'); // Fixed typo from 'database.config'

exports.addPrice = (req, res) => {
  const { price } = req.body; // Manual input from admin
  if (!price || price <= 0) return res.status(400).send('Invalid price');

  db.run(
    'INSERT INTO gold_prices (date, price) VALUES (?, ?)',
    [Date.now(), price],
    (err) => {
      if (err) return res.status(500).send('Database error');
      res.status(201).json({ message: 'Price added', price });
    }
  );
};

exports.getCurrentPrice = (req, res) => {
  // Fetch latest manually entered price
  db.get(
    'SELECT price FROM gold_prices ORDER BY date DESC LIMIT 1',
    (err, row) => {
      if (err) return res.status(500).send('Database error');
      if (!row) return res.status(404).send('No price data available');
      res.json({ price: row.price });
    }
  );
};
// Add a new exchange rate
exports.addExchangeRate = (req, res) => {
  const { rate } = req.body;
  if (!rate || rate <= 0) return res.status(400).send('Invalid exchange rate');

  db.run(
    'INSERT INTO exchange_rate (date, rate) VALUES (?, ?)',
    [Date.now(), rate],
    (err) => {
      if (err) {
        console.error('Database error in addExchangeRate:', err.message); // Log the error
        return res.status(500).send('Database error');
      }
      res.status(201).json({ 
        message: 'Exchange rate added', 
        exchange_rate: rate 
      });
    }
  );
};

// View the current exchange rate
exports.getCurrentExchangeRate = (req, res) => {
  db.get(
    'SELECT rate FROM exchange_rate ORDER BY date DESC LIMIT 1',
    (err, row) => {
      if (err) return res.status(500).send('Database error');
      if (!row) return res.status(404).send('No exchange rate data available');
      res.json({ exchange_rate: row.rate });
    }
  );
};
exports.getPriceHistory = (req, res) => {
  const { period = '1week' } = req.query; // Options: 1week, 1month, 1year, 5years
  let days;

  switch (period) {
    case '1week':
      days = 7;
      break;
    case '1month':
      days = 30;
      break;
    case '1year':
      days = 365;
      break;
    case '5years':
      days = 365 * 5;
      break;
    default:
      return res.status(400).send('Invalid period—use 1week, 1month, 1year, 5years');
  }

  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000; // Convert days to milliseconds

  db.all(
    'SELECT date, price FROM gold_prices WHERE date >= ? ORDER BY date ASC',
    [cutoff],
    (err, rows) => {
      if (err) return res.status(500).send('Database error');
      res.json(rows); // Array of { date, price } for graphing
    }
  );
};