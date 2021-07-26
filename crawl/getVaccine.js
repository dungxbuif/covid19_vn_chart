const axios = require('axios');
const chalk = require('chalk');
const errorWaring = chalk.bold.red;
const successAlert = chalk.bold.cyan;

const getVaccines = () => {
   return new Promise(async (resolve, resject) => {
      try {
         const api = await axios.default({
            method: 'GET',
            url: 'https://tiemchungcovid19.gov.vn/api/public/dashboard/vaccine-allocate/province-detail/reality',
            httpsAgent: new (require('https').Agent)({
               rejectUnauthorized: false,
            }),
         });
         const api2 = await axios.default({
            method: 'GET',
            url: 'https://tiemchungcovid19.gov.vn/api/public/dashboard/vaccination-statistics/all',
            httpsAgent: new (require('https').Agent)({
               rejectUnauthorized: false,
            }),
         });

         let myData = api2.data.map((item, index) => ({
            sodiemtiem: parseInt(item.totalVaccinationLocation),
            tongmuidatiem: parseInt(item.totalInjected),
            danso: parseInt(item.population),
            tiemmui1: parseInt(item.totalOnceInjected),
            tiemmui2: parseInt(item.totalTwiceInjected),
            soloaivaccinephanphoi: parseInt(item.totalVaccineAllocated),
            tongsovaccineduocphan: parseInt(
               api.data[index].totalVaccineAllocated
            ),
            dsvaccine: api.data[index].allocatedList,
            tinh: api.data[index].provinceName,
            matinh: api.data[index].provinceCode,
         }));
         console.log(successAlert('Lấy thông tin vaccines thành công'));
         resolve(myData);
      } catch (e) {
         console.log(errorWaring(`Lỗi lấy thông tin vaccines!!!`));
         resject(e);
      }
   });
};

module.exports = getVaccines;
