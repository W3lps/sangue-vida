const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const questionaryRoutes = require('./routes/questionary');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DB = process.env.DB;
const PORT = process.env.PORT;

const MONGODB_URI = `mongodb+srv://${USER}:${PASSWORD}@blood.cbzkjpg.mongodb.net/${DB}?retryWrites=true&w=majority`;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/', questionaryRoutes);

app.use((err, req, res, next) => {
  const status = (err.statusCode = err.statusCode || 500);
  const message = err.message;
  const data = err.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI)
  .then(result => app.listen(PORT))
  .catch(err => console.log(err));
