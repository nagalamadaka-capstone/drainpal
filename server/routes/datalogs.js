const express = require("express");
const router = express.Router();
const { NotFoundError } = require("../utils/error");
var Parse = require("parse/node");
const BACK4APPKEY = require("../../client/src/securitykeys").BACK4APPKEY;
const BACK4APPSECRET = require("../../client/src/securitykeys").BACK4APPSECRET;

Parse.initialize(BACK4APPKEY, BACK4APPSECRET);
Parse.serverURL = "https://parseapi.back4app.com/";

//save data entry, keep track of user id and return the object
router.post("/save", async (req, res, next) => {
  try {
    const infoUser = req.body;

    let dataLogs = Parse.Object.extend("DataLog");
    var dataLog = new dataLogs();
    dataLog.set("userId", infoUser.id);
    dataLog.set("date", infoUser.date);
    dataLog.set("drainoutput", infoUser.drainOutput);
    dataLog.set("draincolor", infoUser.drainColor);
    dataLog.set("drainoutputphoto", infoUser.drainOutputPhoto);
    dataLog.set("drainskinsitephoto", infoUser.drainSkinSitePhoto);
    dataLog.set(infoUser.sliderArray[0], infoUser.sliderArrayValues[0]);
    dataLog.set(infoUser.sliderArray[1], infoUser.sliderArrayValues[1]);
    dataLog.set(infoUser.sliderArray[2], infoUser.sliderArrayValues[2]);
    dataLog.set(infoUser.sliderArray[3], infoUser.sliderArrayValues[3]);
    dataLog.set(infoUser.sliderArray[4], infoUser.sliderArrayValues[4]);
    dataLog.set(infoUser.sliderArray[5], infoUser.sliderArrayValues[5]);
    dataLog.set(infoUser.sliderArray[6], infoUser.sliderArrayValues[6]);
    dataLog.set("symptoms", infoUser.symptoms);
    dataLog.set("concerns", infoUser.concerns);
    dataLog.save();
    res.send("Data saved!");
  } catch (err) {
    next(err);
  }
});

//fetch all data entries for a user
router.get("/", async (req, res, next) => {
  try {
    const userId = req.query.userId;
    let dataLogs = Parse.Object.extend("DataLog");
    var query = new Parse.Query(dataLogs);
    query.equalTo("userId", userId);
    query.find().then((results) => {
      let newDataLogs = [];
      for (let i = 0; i < results.length; i++) {
        let dataLog = results[i];
        let newDataLog = {
          id: dataLog.id,
          key: dataLog.id,
          userId: dataLog.get("userId"),
          date: dataLog.get("date"),
          drainoutput: dataLog.get("drainoutput"),
          draincolor: dataLog.get("draincolor"),
          drainoutputphoto: dataLog.get("drainoutputphoto"),
          drainskinsitephoto: dataLog.get("drainskinsitephoto"),
          pain: dataLog.get("pain"),
          bowels: dataLog.get("bowels"),
          breathing: dataLog.get("breathing"),
          fatigue: dataLog.get("fatigue"),
          appetite: dataLog.get("appetite"),
          sleeping: dataLog.get("sleeping"),
          nausea: dataLog.get("nausea"),
          symptoms: dataLog.get("symptoms"),
          concerns: dataLog.get("concerns"),
        };
        newDataLogs.push(newDataLog);
      }
      res.send({ newDataLogs });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
