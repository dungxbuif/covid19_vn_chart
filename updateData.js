const Local_vn = require('./app/models/Local_vn');
const History = require('./app/models/History');
const mongoose = require('mongoose');
const api = require('./crawl/moh');
const db = require('./config/db');
require('dotenv').config();
const chalk = require('chalk');


const successAlert = chalk.bold.cyan;
const errorWaring = chalk.bold.red;

const URL = process.env.MONGODB_URL;
db.connect(URL);

api.getMohAPI().then(res => {
  const { local_vn, vietnam, world } = res;

  History.findOneAndUpdate({ Date: world.Date }, world, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
    useFindAndModify: true,
  })
    .then(() => console.log(successAlert('Saved world history successfully!!!')))
    .catch(() => console.log(errorWaring('Saved world history fail!!!')))

  History.findOneAndUpdate({ Date: vietnam.Date }, vietnam, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  })
    .then(() => console.log(successAlert('Saved vietnam history successfully!!!')))
    .catch(() => console.log(errorWaring('Saved vietnam history fail!!!')))

  Local_vn.findOneAndUpdate({ Date: local_vn.Date }, local_vn, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  })
    .then(() => console.log(successAlert('Saved vietnam local successfully!!!')))
    .catch(() => console.log(errorWaring('Saved vietnam local fail!!!')))

});