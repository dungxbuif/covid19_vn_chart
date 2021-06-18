const moment = require('../../client/node_modules/moment')
const updateData = require('../../crawl/updateData');
const Local_vn = require('../models/Local_vn');
const History = require('../models/History');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs')

const errorWaring = chalk.bold.red;

module.exports = {
  history: (req, res, next) => {
    History.find({ "Slug": "vietnam", })
      .then(data => {
        data.forEach(item => {
          item.Date = moment(item.Date, 'DD-MM-YYYY').format('DD/MM/YYYY')
        });
        res.json(data);
      })
      .catch(err => { throw err })
  },
  "detail-local-vn": (req, res, next) => {
    const _localKey = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/local_key.json')));
    Local_vn.find({ Date: moment(new Date()).format('DD-MM-YYYY')})
      .then(arr=>{
        let data = arr[0].data;
        let tmpArr =[]

        data.map(item=>{
          const oldHcKey = item['hc-key']
          if(_localKey[oldHcKey] == undefined) 
            return

          const newHcKey = _localKey[oldHcKey]['hc-key'];
          const newAltName = _localKey[oldHcKey]['alt-name'];

          tmpArr.push(newHcKey)

          // update new value hc-key and alt name for item
          item['hc-key'] = newHcKey.replace('.','-').toLowerCase();
          item['localname'] = newAltName;
          return item;
        })

        Object.entries(_localKey).forEach(entry=>{
            let [key,value] = entry;
  
            if(!tmpArr.includes(value['hc-key']))
              data.push({
                "socakhoi": 0,
                "socadangdieutri": 0,
                "socatuvong": 0,
                "hc-key": value['hc-key'].replace('.','-').toLowerCase(),
                "value": 0,
                "localname": value['alt-name'],
              });
  
          });


        res.send(data)
      })
      .catch(err => {
        updateData();
        console.log(errorWaring(`Error": ${err.message}. Updated data please refresh page`))
      }); 
    
  }
}