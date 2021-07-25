const updateData = require('./crawl/updateData');
const path = require('path');
const schedule = require('node-schedule');
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
const URL = process.env.MONGODB_URL;
db.connect(URL);

updateData();

//schedule run update
const runUpdateData = schedule.scheduleJob({ minute: 58 }, (time) => {
   updateData();
});

app.listen(port, () =>
   console.log(
      successAlert(`Server is running on http://dungxbuif-localhost:${port}`)
   )
);
