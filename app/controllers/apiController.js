const moment = require('moment');
const Local_vn = require('../models/Local_vn');
const History = require('../models/History');
const VaccineDetail = require('../models/VaccineDetail');
const chalk = require('chalk');

const errorWaring = chalk.bold.red;

module.exports = {
   history: (req, res, next) => {
      History.find()
         .then((data) => {
            let tmpArr = [...data];
            tmpArr.forEach((item) => {
               item.Date = moment(item.Date, 'DD-MM-YYYY').format('DD/MM/YYYY');
            });
            res.json(tmpArr);
         })
         .catch((err) => {
            throw err;
         });
   },
   detail_local_vn: (req, res, next) => {
      Local_vn.find({ Date: moment().format('DD-MM-YYYY') })
         .then((arr) => {
            res.status(200).json(arr[0].data);
         })
         .catch((err) => {
            console.log(
               errorWaring(`Error:${err.message} when get data from database`)
            );
         });
   },
   history_per_day: (req, response, next) => {
      History.find({ ISO2: 'vn' }).then((res) => {
         res[0].Date = moment(res[0].Date, 'DD-MM-YYYY').format('DD/MM/YYYY');
         let data = [{ ...res[0] }];

         for (let i = 1; i < res.length; i++) {
            data.push({
               Country: res[i].Country,
               Slug: res[i].Slug,
               ISO2: res[i].ISO2,
               Confirmed:
                  parseInt(res[i].Confirmed) - parseInt(res[i - 1].Confirmed),
               Deaths: parseInt(res[i].Deaths) - parseInt(res[i - 1].Deaths),
               Recovered:
                  parseInt(res[i].Recovered) - parseInt(res[i - 1].Recovered) >
                  0
                     ? parseInt(res[i].Recovered) -
                       parseInt(res[i - 1].Recovered)
                     : 0,
               Date: moment(res[i].Date, 'DD-MM-YYYY').format('DD/MM/YYYY'),
            });
         }
         response.json(data);
      });
   },
   vaccine_details: (req, res, next) => {
      VaccineDetail.find()
         .then((data) => {
            res.json(data);
         })
         .catch((err) => {
            throw err;
         });
   },
};
