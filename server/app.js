const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const MLAB_URI = process.env.MLAB_URI;


mongoose.connect(MLAB_URI, { useNewUrlParser: true , 
  auth: {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD
  }},
  (err) => {
  if(err) {
    return console.log(err, 'An internal server error has occured');
  }
});
mongoose.Promise = Promise;

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req, res) => {
  res.status(200).send('boop gimmie da loot');
});

module.exports = app;