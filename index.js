const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/history', require('./api/route'));

const PORT = process.env.PORT || 1212;
app.listen(PORT, () => {
  console.log('app is runing on PORT 1212');
  mongoose.connect(
    `mongodb+srv://joney:joney1@cluster0.2furb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
    () => {
      console.log('database connected');
    }
  );
});
