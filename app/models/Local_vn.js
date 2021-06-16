const moment = require('../../client/node_modules/moment');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Local_vn = new Schema(
  {
    Date: { type: String, default: moment(new Date()).format("DD-MM-YYYY") },
    data: {type: Array},
  }
)

module.exports = mongoose.model('Local_vn', Local_vn);
