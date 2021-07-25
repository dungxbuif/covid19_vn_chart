const moment = require('moment');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Local_vn = new Schema({
   Date: { type: String, default: moment().format('DD-MM-YYYY') },
   data: { type: Array },
});

module.exports = mongoose.model('Local_vn', Local_vn);
