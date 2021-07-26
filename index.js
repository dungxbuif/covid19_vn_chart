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
