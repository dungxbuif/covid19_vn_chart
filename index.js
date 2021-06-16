require('dotenv').config();
const express = require('express');
const route = require('./routes');
const crawl = require('./crawl/moh');
const db = require('./config/db');
const chalk = require('chalk');

const successAlert = chalk.bold.cyan;
const errorWaring = chalk.bold.red;

const app = express();
const port = process.env.PORT || 1612;

app.use(express.json());

// Routing
route(app);

//Connect MongoDB 
const URL = process.env.MONGODB_URL;
db.connect(URL);

const api = require('./crawl/moh');
api.getMohAPI().then(res => console.log(res));


app.listen(port, () =>
    console.log(successAlert(`Server is running on http://dungxbuif-localhost:${port}`)),
);
