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

// app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// app.use(methodOverride('_method'));

// Routing
route(app);

//Connect MongoDB 
const URL = process.env.MONGODB_URL;
db.connect(URL);


app.listen(port, () =>
    console.log(successAlert(`Server is running on http://dungxbuif-localhost:${port}`)),
);
