const db = require('../config/database.config');

exports.buyGold = (req, res) => {
  const { amount, weight } = req.body; // User can send amount ($) or weight (g)
  if ((!amount && !weight) || (amount && weight)) return res.status(400).send('Specify either amount or weight');
  if (amount && amount <= 0) return res.status(400).send('Invalid amount');
  if (weight && weight <= 0) return res.status(400).send('Invalid weight');

  db.get('SELECT price FROM gold_prices ORDER BY date DESC LIMIT 1', (err, row) => {
    if (err || !row) return res.status(500).send('Price unavailable');
    const pricePerOz = row.price;

    let finalWeight, finalAmount;
    if (amount) {
      finalWeight = amount / (pricePerOz / 31.1035); // $ to grams
      finalAmount = amount;
    } else {
      finalWeight = weight;
      finalAmount = weight * (pricePerOz / 31.1035); // grams to $
    }

    db.run(
      'INSERT INTO transactions (user_id, date, weight, price, amount, type, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.userId, Date.now(), finalWeight, pricePerOz, finalAmount, 'buy', 'held'],
      (err) => {
        if (err) return res.status(500).send('Database error');
        db.run(
          'UPDATE users SET gold_holding = gold_holding + ?, invested_total = invested_total + ? WHERE id = ?',
          [finalWeight, finalAmount, req.userId],
          (err) => {
            if (err) return res.status(500).send('Update error');
            res.json({ goldBought: finalWeight, cost: finalAmount });
          }
        );
      }
    );
  });
};

exports.redeemGold = (req, res) => {
  const { weight } = req.body; // Allow custom weight, default to 1g if unspecified
  const redeemWeight = weight && weight > 0 ? weight : 1;

  db.get('SELECT gold_holding FROM users WHERE id = ?', [req.userId], (err, row) => {
    if (err) return res.status(500).send('Database error');
    if (!row || row.gold_holding < redeemWeight) return res.status(400).send(`Need at least ${redeemWeight}g`);

    db.run(
      'INSERT INTO transactions (user_id, date, weight, type) VALUES (?, ?, ?, ?)',
      [req.userId, Date.now(), redeemWeight, 'withdraw'],
      function (err) {
        if (err) return res.status(500).send('Transaction error');
        const withdrawId = this.lastID;

        db.run(
          'INSERT INTO withdrawals (user_id, withdraw_transaction_id, date, weight, status) VALUES (?, ?, ?, ?, ?)',
          [req.userId, withdrawId, Date.now(), redeemWeight, 'requested'],
          (err) => {
            if (err) return res.status(500).send('Withdrawal error');
            db.run(
              'UPDATE users SET gold_holding = gold_holding - ? WHERE id = ?',
              [redeemWeight, req.userId],
              (err) => {
                if (err) return res.status(500).send('Update error');
                db.all(
                  'SELECT id, weight FROM transactions WHERE user_id = ? AND type = "buy" AND status = "held" ORDER BY date ASC',
                  [req.userId],
                  (err, rows) => {
                    if (err) return res.status(500).send('Query error');
                    let remaining = redeemWeight;
                    const toWithdraw = [];
                    for (const row of rows) {
                      if (remaining <= 0) break;
                      toWithdraw.push(row.id);
                      remaining -= row.weight;
                    }
                    db.run(
                      'UPDATE transactions SET status = "withdrawn" WHERE id IN (' + toWithdraw.join(',') + ')',
                      (err) => {
                        if (err) return res.status(500).send('Status error');
                        res.send('Redemption requested');
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
};

exports.updateWithdrawStatus = (req, res) => {
  const { withdrawId, newStatus } = req.body; // withdrawId from withdrawals table
  const validStatuses = ['requested', 'approved', 'on_shipping', 'delivered'];
  if (!withdrawId || !validStatuses.includes(newStatus)) return res.status(400).send('Invalid withdraw ID or status');
  db.run('UPDATE withdrawals SET status = ?, date = ? WHERE id = ? AND user_id = ?', 
    [newStatus, Date.now(), withdrawId, req.userId], (err) => {
      if (err) return res.status(500).send('Database error');
      res.send(`Status updated to ${newStatus}`);
    });
};

exports.getTransactions = (req, res) => {
  db.all('SELECT id, date, weight, price, amount, type, status FROM transactions WHERE user_id = ? ORDER BY date DESC', 
    [req.userId], (err, rows) => {
      if (err) return res.status(500).send('Database error');
      res.json(rows); // Array of transactions
    });
};

exports.getWithdrawalHistory = (req, res) => {
  db.all('SELECT id, date, weight, status FROM withdrawals WHERE user_id = ? ORDER BY date DESC', 
    [req.userId], (err, rows) => {
      if (err) return res.status(500).send('Database error');
      res.json(rows); // Array of withdrawals
    });
};

exports.getPendingWithdrawals = (req, res) => {
  db.all('SELECT id, date, weight, status FROM withdrawals WHERE user_id = ? AND status != "delivered" ORDER BY date DESC', 
    [req.userId], (err, rows) => {
      if (err) return res.status(500).send('Database error');
      res.json(rows);
    });
};