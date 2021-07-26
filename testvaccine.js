const axios = require('axios');
const fs = require('fs');
const Va = require('./app/models/VaccineDetail');
require('dotenv').config();
const URL = process.env.MONGODB_URL;
const db = require('./config/db');
db.connect(URL);
const test = async () => {
   // Phân bố vaccine
   const res = await axios.default({
      method: 'GET',
      url: 'https://tiemchungcovid19.gov.vn/api/public/dashboard/vaccine-allocate/province-detail/reality',
      httpsAgent: new (require('https').Agent)({
         rejectUnauthorized: false,
      }),
   });

   // Vacine theo ngày
   // const res1 = await axios.default({
   //    method: 'GET',
   //    url: 'https://tiemchungcovid19.gov.vn/api/public/dashboard/vaccination-statistics/get-detail-latest',
   //    httpsAgent: new (require('https').Agent)({
   //       rejectUnauthorized: false,
   //    }),
   // });
   // console.log(res1.data);

   //Vaccine từng tỉnh
   const res2 = await axios.default({
      method: 'GET',
      url: 'https://tiemchungcovid19.gov.vn/api/public/dashboard/vaccination-statistics/all',
      httpsAgent: new (require('https').Agent)({
         rejectUnauthorized: false,
      }),
   });
   let myData = res2.data.map((item, index) => ({
      sodiemtiem: item.totalVaccinationLocation,
      tongmuidatiem: item.totalInjected,
      danso: item.population,
      tiemmui1: item.totalOnceInjected,
      tiemmui2: item.totalTwiceInjected,
      soloaivaccinephanphoi: item.totalVaccineAllocated,
      tongsovaccineduocphan: res.data[index].totalVaccineAllocated,
      dsvaccine: res.data[index].allocatedList,
      tinh: res.data[index].provinceName,
      matinh: res.data[index].provinceCode,
   }));

   let i = 0;
   function save() {
      if (i == myData.length) return;
      Va.findOneAndUpdate({ matinh: myData[i].matinh }, myData[i], {
         upsert: true,
         new: true,
         setDefaultsOnInsert: true,
      })
         .then(() => {
            console.log(`Saved vietnam history successfully at !!!`);
            i++;
            save();
         })
         .catch(() => {
            errorWaring(`Saved vietnam history fail at!!!`);
         });
   }

   save();
};
