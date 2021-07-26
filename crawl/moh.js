const moment = require('moment');
const axios = require('axios');
const cheerio = require('cheerio');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const getLocalValue = require('./getLocalAPI');

const successAlert = chalk.bold.cyan;
const errorWaring = chalk.bold.red;

const getLocalVN = async () => {
   try {
      let res = await axios.default({
         method: 'GET',
         url: 'http://ncov.moh.gov.vn/',
         httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false,
         }),
      });

      console.log(
         successAlert(
            `Get MOH source successfully at ${moment(new Date()).format(
               'DD/MM/YYYY HH:mm:SS'
            )}`
         )
      );

      let $ = cheerio.load(res.data);

      const script = $('script:not([src],[type])');
      let script_data = '';
      for (let i = 0; i < script.length; i++) {
         if (script[i].children[0].data.includes('var data = [{"socakhoi"')) {
            script_data = script[i].children[0].data;
            break;
         }
      }
      const detail_vn = JSON.parse(script_data.match(/\[{.*?\}]/)[0]);

      const _localKey = JSON.parse(
         fs.readFileSync(path.join(__dirname, '../config/local_key.json'))
      );

      let tmpArr = [];
      detail_vn.map((item) => {
         const oldHcKey = item['hc-key'];
         if (_localKey[oldHcKey] == undefined) return;

         const newHcKey = _localKey[oldHcKey]['hc-key'];
         const newAltName = _localKey[oldHcKey]['alt-name'];

         tmpArr.push(newHcKey);

         // update new value hc-key and alt name for item
         item['hc-key'] = newHcKey.replace('.', '-').toLowerCase();
         item['localname'] = newAltName;
         return item;
      });

      let provineVal = await getLocalValue();

      detail_vn.forEach((ele) => {
         if (provineVal[ele.localname]) {
            ele.value = parseInt(provineVal[ele.localname]);
         }
      });

      Object.entries(_localKey).forEach((entry) => {
         let [key, value] = entry;

         if (!tmpArr.includes(value['hc-key']))
            detail_vn.push({
               socakhoi: 0,
               socadangdieutri: 0,
               socatuvong: 0,
               'hc-key': value['hc-key'].replace('.', '-').toLowerCase(),
               value: 0,
               localname: value['alt-name'],
            });
      });

      let local_vn = {
         Date: moment().format('DD-MM-YYYY'),
         data: detail_vn,
      };

      return local_vn;
   } catch (err) {
      console.log(
         errorWaring(
            `Get MOH source fail because ${err} at ${moment(new Date()).format(
               'DD/MM/YYYY HH:MM:SS'
            )}`
         )
      );
   }
};

const getDetailVN = async () => {
   try {
      let res = await axios.default({
         method: 'GET',
         url: 'https://www.worldometers.info/coronavirus/country/viet-nam/',
         httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false,
         }),
      });

      console.log(
         successAlert(
            `Get VN detail source successfully at ${moment(new Date()).format(
               'DD/MM/YYYY HH:mm:SS'
            )}`
         )
      );

      let $ = cheerio.load(res.data);

      let selector = $('.maincounter-number');
      let Confirmed = parseInt($(selector[0]).text().replace(',', ''));
      let Deaths = parseInt($(selector[1]).text().replace(',', ''));
      let Recovered = parseInt($(selector[2]).text().replace(',', ''));
      let Active = Confirmed - Deaths - Recovered;
      let dataVn = {
         Confirmed: Confirmed,
         Active: Active,
         Recovered: Recovered,
         Deaths: Deaths,
         Country: 'Việt Nam',
         Slug: 'vietnam',
         ISO2: 'vn',
         Date: moment().format('DD-MM-YYYY'),
      };

      return dataVn;
   } catch (err) {
      console.log(
         errorWaring(
            `Get VN detail source fail because ${err} at ${moment(
               new Date()
            ).format('DD/MM/YYYY HH:MM:SS')}`
         )
      );
   }
};

const getData = async () => {
   return new Promise(async (resolve, reject) => {
      let [local_vn, vietnam] = await Promise.all([
         getLocalVN(),
         getDetailVN(),
      ]);
      resolve({ local_vn, vietnam });
   });
};

module.exports = getData;

// const selectorVN =
//     "#portlet_corona_trangchu_top_CoronaTrangchuTopPortlet_INSTANCE_RrVAbIFIPL7v > div > div.portlet-content-container > div > section.container > div.row.d-none.d-block.d-lg-none > div > div.form-row";
// const selectorWorld =
//     "#portlet_corona_trangchu_top_CoronaTrangchuTopPortlet_INSTANCE_RrVAbIFIPL7v > div > div.portlet-content-container > div > section.container > div.row.d-none.d-block.d-lg-none > div > div.row";
// $(selectorVN).each((index, el) => {
//     let Confirmed = $(el).find(".text-danger-new span").text();
//     let Active = $(el)
//         .find(".text-warning1:contains(Đang điều trị) span")
//         .text();
//     let Recovered = $(el)
//         .find(".text-success:contains(Khỏi) span")
//         .text();
//     let Deaths = $(el)
//         .find(".text-danger-new1:contains(Tử vong) span")
//         .text();
//     let dataVn = {
//         Confirmed: Confirmed.split(".").join(""),
//         Active: Active.split(".").join(""),
//         Recovered: Recovered.split(".").join(""),
//         Deaths: Deaths.split(".").join(""),
//         Country: "Việt Nam",
//         Slug: "vietnam",
//         ISO2: "vn",
//         Date: moment().format("DD-MM-YYYY"),
//     };

//     data.vietnam = dataVn;
// });

// $(selectorWorld).each((index, el) => {
//     let Confirmed = $(el).find(".text-danger-new span").text();
//     let Active = $(el)
//         .find(".text-warning1:contains(Đang nhiễm) span")
//         .text();
//     let Recovered = $(el)
//         .find(".text-success:contains(Khỏi) span")
//         .text();
//     let Deaths = $(el)
//         .find(".text-danger-new1:contains(Tử vong) span")
//         .text();
//     let dataWolrd = {
//         Confirmed: Confirmed.split(".").join(""),
//         Active: Active.split(".").join(""),
//         Recovered: Recovered.split(".").join(""),
//         Deaths: Deaths.split(".").join(""),
//         Country: "Thế giới",
//         Slug: "world",
//         ISO2: "wld",
//         Date: moment().format("DD-MM-YYYY"),
//     };
//     data.world = dataWolrd;
// });
