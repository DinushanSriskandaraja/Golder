const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/authRoute');
const goldRoutes = require('./routes/goldRoute');
const priceRoutes = require('./routes/priceRoute');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/gold', goldRoutes);
app.use('/price', priceRoutes);

app.listen(5000, () => console.log('Server on port 5000'));