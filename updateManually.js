const moment = require('./client/node_modules/moment');
const Local_vn = require('./app/models/Local_vn');
const History = require('./app/models/History');
const api = require('./crawl/moh');;
require('dotenv').config();
const chalk = require('chalk');
const db = require('./config/db');
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
    .then(() => console.log(successAlert(`Saved world history successfully at ${moment(new Date()).format('DD/MM/YYYY HH:MM:SS')}!!!`)))
    .catch(() => console.log(errorWaring(`Saved world history failat ${moment(new Date()).format('DD/MM/YYYY HH:MM:SS')}!!!`)))

  History.findOneAndUpdate({ Date: vietnam.Date }, vietnam, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  })
    .then(() => console.log(successAlert(`Saved vietnam history successfully at ${moment(new Date()).format('DD/MM/YYYY HH:MM:SS')}!!!`)))
    .catch(() => console.log(errorWaring(`Saved vietnam history fail at ${moment(new Date()).format('DD/MM/YYYY HH:MM:SS')}!!!`)))

  Local_vn.findOneAndUpdate({ Date: local_vn.Date }, local_vn, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  })
    .then(() => console.log(successAlert(`Saved vietnam local successfully at ${moment(new Date()).format('DD/MM/YYYY HH:MM:SS')}!!!`)))
    .catch(() => console.log(errorWaring(`Saved vietnam local fail at ${moment(new Date()).format('DD/MM/YYYY HH:MM:SS')}!!!`)))
});