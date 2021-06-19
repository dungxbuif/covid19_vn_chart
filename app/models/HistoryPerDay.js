const moment = require('../../client/node_modules/moment/ts3.1-typings/moment');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConfirmedHistory = new Schema(
  {
    Country: { type: String, required: true },
    Slug: { type: String, lowercase: true, trim: true, required: true },
    ISO2: { type: String, lowercase: true, trim: true, required: true },
    Confirmed: { type: Number, default: 0},
    Deaths: { type: Number, default: 0},
    Recovered: { type: Number, default: 0},
    Date: { type: String, default: moment(new Date()).format("DD-MM-YYYY") },
  }
)

module.exports = mongoose.model('ConfirmedHistory', ConfirmedHistory);