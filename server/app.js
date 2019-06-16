const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

mongoose.connect('mongodb://localhost:27017/node200-mongoose-blog-api', { useNewUrlParser: true }, (err) => {
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