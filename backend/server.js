const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();
// app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .then(() => sequelize.sync({ alter: true }))
  .catch(err => console.error('DB error:', err));

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
