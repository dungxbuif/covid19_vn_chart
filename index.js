const path = require('path');
const express = require('express');
const route = require('./routes');
const db = require('./config/db');
const chalk = require('chalk');
require('dotenv').config();

const successAlert = chalk.bold.cyan;

const app = express();
const port = process.env.PORT || 1612;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
   console.log(req.headers);
   if (
      req.headers.api_key !== 'MY_TRACKING_COVID' ||
      req.headers.host !== 'dungxbuif-covid-tracking.herokuapp.com' ||
      req.headers.referer !== 'https://dungxbuif-covid-tracking.herokuapp.com/'
   ) {
      res.json({ errStatus: 'You can not acccess this URL' });
   }

   next();
});
app.use('/public', express.static(path.join(__dirname, 'build/static')));
app.use('/', express.static(path.join(__dirname, 'build')));

// Routing
route(app);

//Connect MongoDB
const URL =
   'mongodb+srv://dungxbuif:5CCB3QaxZoynUwJM@database.xjpgh.mongodb.net/database?retryWrites=true&w=majority';
db.connect(URL);

app.listen(port, () =>
   console.log(
      successAlert(`Server is running on http://dungxbuif-localhost:${port}`)
   )
);
