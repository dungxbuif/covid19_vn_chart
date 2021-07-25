const axios = require('axios');
const chalk = require('chalk');
const errorWaring = chalk.bold.red;

const api = () => {
   return new Promise(async (resolve, resject) => {
      try {
         let res = await axios.get(
            'https://api.antoancovid.vn/google-syn/api/getTongCa?tinh=&huyen=&xa='
         );
         let rawData = res.data.data.map((ele) => [ele.diaphuong, ele.tongCa]);
         let data = Object.fromEntries(rawData);
         resolve(data);
      } catch (e) {
         console.log(errorWaring(`Lỗi lấy thông tin từng tỉnh!!!`));
         resject(e);
      }
   });
};

module.exports = api;
