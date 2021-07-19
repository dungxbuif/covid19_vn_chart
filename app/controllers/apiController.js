const moment = require("../../client/node_modules/moment");
const updateData = require("../../crawl/updateData");
const Local_vn = require("../models/Local_vn");
const History = require("../models/History");
const chalk = require("chalk");
const path = require("path");
const getLocalValue = require("../../services/getLocalAPI");
const fs = require("fs");

const errorWaring = chalk.bold.red;

module.exports = {
    history: (req, res, next) => {
        History.find()
            .then((data) => {
                let tmpArr = [...data];
                tmpArr.forEach((item) => {
                    item.Date = moment(item.Date, "DD-MM-YYYY").format(
                        "DD/MM/YYYY"
                    );
                });
                res.json(tmpArr);
            })
            .catch((err) => {
                throw err;
            });
    },
    detail_local_vn: (req, res, next) => {
        const _localKey = JSON.parse(
            fs.readFileSync(path.join(__dirname, "../../config/local_key.json"))
        );
        Local_vn.find({ Date: moment().format("DD-MM-YYYY") })
            .then(async (arr) => {
                let data = arr[0].data;
                let tmpArr = [];

                data.map((item) => {
                    const oldHcKey = item["hc-key"];
                    if (_localKey[oldHcKey] == undefined) return;

                    const newHcKey = _localKey[oldHcKey]["hc-key"];
                    const newAltName = _localKey[oldHcKey]["alt-name"];

                    tmpArr.push(newHcKey);

                    // update new value hc-key and alt name for item
                    item["hc-key"] = newHcKey.replace(".", "-").toLowerCase();
                    item["localname"] = newAltName;
                    return item;
                });

                let provineVal = await getLocalValue();
                data.forEach((ele) => {
                    if (provineVal[ele.localname]) {
                        ele.value = parseInt(provineVal[ele.localname]);
                    }
                });

                Object.entries(_localKey).forEach((entry) => {
                    let [key, value] = entry;

                    if (!tmpArr.includes(value["hc-key"]))
                        data.push({
                            socakhoi: 0,
                            socadangdieutri: 0,
                            socatuvong: 0,
                            "hc-key": value["hc-key"]
                                .replace(".", "-")
                                .toLowerCase(),
                            value: 0,
                            localname: value["alt-name"],
                        });
                });

                res.send(data);
            })
            .catch((err) => {
                updateData();
                console.log(
                    errorWaring(
                        `Error": ${err.message}. Updated data please refresh page`
                    )
                );
            });
    },
    history_per_day: (req, response, next) => {
        History.find({ ISO2: "vn" }).then((res) => {
            let data = [
                {
                    Country: res[0].Country,
                    Slug: res[0].Slug,
                    ISO2: res[0].ISO2,
                    Confirmed: res[0].Confirmed,
                    Deaths: res[0].Deaths,
                    Recovered: res[0].Recovered,
                    Date: moment(res[0].Date, "DD-MM-YYYY").format(
                        "DD/MM/YYYY"
                    ),
                },
            ];

            for (let i = 1; i < res.length; i++) {
                data.push({
                    Country: res[i].Country,
                    Slug: res[i].Slug,
                    ISO2: res[i].ISO2,
                    Confirmed:
                        parseInt(res[i].Confirmed) -
                        parseInt(res[i - 1].Confirmed),
                    Deaths:
                        parseInt(res[i].Deaths) - parseInt(res[i - 1].Deaths),
                    Recovered:
                        parseInt(res[i].Recovered) -
                            parseInt(res[i - 1].Recovered) >
                        0
                            ? parseInt(res[i].Recovered) -
                              parseInt(res[i - 1].Recovered)
                            : 0,
                    Date: moment(res[i].Date, "DD-MM-YYYY").format(
                        "DD/MM/YYYY"
                    ),
                });
            }
            response.json(data);
        });
    },
};
