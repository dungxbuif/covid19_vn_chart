const moment = require('moment');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Vaccine_detail = new Schema({
   matinh: { type: String },
   tinh: { type: String },
   danso: { type: Number },
   sodiemtiem: { type: Number },
   tongmuidatiem: { type: Number },
   tiemmui1: { type: Number },
   tiemmui2: { type: Number },
   soloaivaccinephanphoi: { type: Number },
   tongsovaccineduocphan: { type: Number },
   dsvaccine: { type: Array },
});

module.exports = mongoose.model('Vaccine_detail', Vaccine_detail);
