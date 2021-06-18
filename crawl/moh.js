const moment = require('../client/node_modules/moment');
const axios = require('../client/node_modules/axios');
const { model } = require('mongoose');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');

const successAlert = chalk.bold.cyan;
const errorWaring = chalk.bold.red;



module.exports = {
  getMohAPI: async () => {
    try{
      const data = {}; 
      const res = await axios.default({
        method: 'GET',
        url: 'http://ncov.moh.gov.vn/',
        httpsAgent: new (require('https').Agent)({rejectUnauthorized: false})
      })

      console.log(successAlert(`Get source successfully at ${moment(new Date()).format('DD/MM/YYYY HH:MM:SS')}`));
      
      const $ = cheerio.load(res.data);

      const selectorVN = '#portlet_corona_trangchu_top_CoronaTrangchuTopPortlet_INSTANCE_RrVAbIFIPL7v > div > div.portlet-content-container > div > section.container > div.row.d-none.d-block.d-lg-none > div > div.form-row';
      const selectorWorld = '#portlet_corona_trangchu_top_CoronaTrangchuTopPortlet_INSTANCE_RrVAbIFIPL7v > div > div.portlet-content-container > div > section.container > div.row.d-none.d-block.d-lg-none > div > div.row';
      
      const script = $('script:not([src])')[15].children[0].data;
      const detail_vn = JSON.parse(script.match(/\[{.*?\}]/)[0]);
      data.local_vn = { 
        Date: moment(new Date()).format("DD-MM-YYYY"),
        data: detail_vn
      };
      
      $(selectorVN).each((index, el) => {
        let Confirmed = $(el).find('.text-danger-new span').text();
        let Active = $(el).find('.text-warning1:contains(Đang điều trị) span').text();
        let Recovered = $(el).find('.text-success:contains(Khỏi) span').text();
        let Deaths = $(el).find('.text-danger-new1:contains(Tử vong) span').text();
        let dataVn = {
          Confirmed: Confirmed.split('.').join(''),
          Active: Active.split('.').join(''),
          Recovered: Recovered.split('.').join(''),
          Deaths: Deaths.split('.').join(''),
          Country: 'Việt Nam',
          Slug: "vietnam",
          ISO2: 'vn',
          Date:  moment(new Date()).format("DD-MM-YYYY"),
        }

        data.vietnam = dataVn;
      
      });

      $(selectorWorld).each((index, el) => {
        let Confirmed = $(el).find('.text-danger-new span').text();
        let Active = $(el).find('.text-warning1:contains(Đang nhiễm) span').text();
        let Recovered = $(el).find('.text-success:contains(Khỏi) span').text();
        let Deaths = $(el).find('.text-danger-new1:contains(Tử vong) span').text();
        let dataWolrd = {
          Confirmed: Confirmed.split('.').join(''),
          Active: Active.split('.').join(''),
          Recovered: Recovered.split('.').join(''),
          Deaths: Deaths.split('.').join(''),
          Country: 'Thế giới',
          Slug: "world",
          ISO2: 'wld',
          Date:  moment(new Date()).format("DD-MM-YYYY"),
        };
        data.world = dataWolrd;
      });

      return data;
    }catch (err) {
      console.log(errorWaring(`Get source fail because ${err} at ${moment(new Date()).format('DD/MM/YYYY HH:MM:SS')}`));
    }
  }

}
