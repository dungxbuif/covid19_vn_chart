const moment = require('moment');
const Local_vn = require('../app/models/Local_vn');
const History = require('../app/models/History');
const Vaccine_details = require('../app/models/VaccineDetail');
const getDataMOH = require('./moh');
const getVaccines = require('./getVaccine');
require('dotenv').config();
const chalk = require('chalk');

const successAlert = chalk.bold.cyan;
const errorWaring = chalk.bold.red;

const URL = process.env.MONGODB_URL;

module.exports = async () => {
   const { local_vn, vietnam } = await getDataMOH();
   const vaccine_details = await getVaccines();
   // History.findOneAndUpdate({ Date: world.Date, ISO2: "wld" }, world, {
   //   upsert: true,
   //   new: true,
   //   setDefaultsOnInsert: true,
   //   useFindAndModify: false,
   // })
   //   .then(() => console.log(successAlert(`Saved world history successfully at ${moment(new Date()).format('DD/MM/YYYY HH:mm:SS')}!!!`)))
   //   .catch(() => console.log(errorWaring(`Saved world history failat ${moment(new Date()).format('DD/MM/YYYY HH:mm:SS')}!!!`)))

   // Update daily data
   History.findOneAndUpdate({ Date: vietnam.Date, ISO2: 'vn' }, vietnam, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
   })
      .then(() => {
         console.log(
            successAlert(
               `Saved vietnam history successfully at ${moment().format(
                  'DD/MM/YYYY HH:mm:SS'
               )}!!!`
            )
         );
      })
      .catch(() => {
         console.log(
            errorWaring(
               `Saved vietnam history fail at ${moment().format(
                  'DD/MM/YYYY HH:mm:SS'
               )}!!!`
            )
         );
      });

   //Update each provines data
   Local_vn.findOneAndUpdate({ Date: local_vn.Date }, local_vn, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
   })
      .then(() => {
         console.log(
            successAlert(
               `Saved vietnam local successfully at ${moment().format(
                  'DD/MM/YYYY HH:mm:SS'
               )}!!!`
            )
         );
      })
      .catch(() => {
         console.log(
            errorWaring(
               `Saved vietnam local fail at ${moment().format(
                  'DD/MM/YYYY HH:mm:SS'
               )}!!!`
            )
         );
      });

   let i = 0;
   function saveVaccine() {
      if (i == vaccine_details.length) {
         console.log(
            successAlert(
               `Saved vietnam local successfully at ${moment().format(
                  'DD/MM/YYYY HH:mm:SS'
               )}!!!`
            )
         );
         return;
      }
      Vaccine_details.findOneAndUpdate(
         { matinh: vaccine_details[i].matinh },
         vaccine_details[i],
         {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
         }
      )
         .then(() => {
            i++;
            saveVaccine();
         })
         .catch((e) => {
            console.log(
               errorWaring(
                  `Lưu thông tin vaccines lỗi : ${e} ${moment().format(
                     'DD/MM/YYYY HH:mm:SS'
                  )}!!!`
               )
            );
         });
   }

   saveVaccine();
};
