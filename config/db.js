const mongoose = require('mongoose');
const chalk = require('chalk');


const connected = chalk.bold.cyan;
const error = chalk.bold.red;
const disconnected = chalk.bold.yellow;


module.exports = {
  connect:  (URL) => {
    mongoose.connect(URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    mongoose.connection.on('connected', () => {
      console.log(connected('Connect to MongoDB successfully !!!'));
    });
    mongoose.connection.on('error', err => {
      console.log(error(`Mongoose default connection has occured ${err} error`));
    });
    mongoose.connection.on('disconnected', () => {
      console.log(disconnected("Mongoose default connection is disconnected"));
    });
  }
}
