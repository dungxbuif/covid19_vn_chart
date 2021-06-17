const moment = require('../../client/node_modules/moment')
const Local_vn = require('../models/Local_vn');
const History = require('../models/History');
const path = require('path');
const fs = require('fs')

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

        let resArr = data.map(item=>{
          const oldHcKey = item['hc-key']
          if(_localKey[oldHcKey] == undefined) 
            return

          const newHcKey = _localKey[oldHcKey]['hc-key'];
          const newAltName = _localKey[oldHcKey]['alt-name'];

          // update new value hc-key and alt name for item
          item['hc-key'] = newHcKey.replace('.','-').toLowerCase();
          item['alt-name'] = newAltName;
          return item;
        })

        // Delete null value from arr
        let finalRes = resArr.filter(function (el) {
          return el != null;
        });

        res.send(data)
      })
      .catch(err => {throw err}); 
    
  }
}