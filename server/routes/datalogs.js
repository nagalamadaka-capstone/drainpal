const express = require("express");
const router = express.Router();
const { NotFoundError } = require("../utils/error");
var Parse = require("parse/node");
const axios = require("axios");
const got = require("got");
const File = require("file-class");
const fs = require("fs");
const FormData = require("form-data");
const dotenv = require("dotenv");
dotenv.config();

Parse.initialize(process.env.BACK4APPKEY, process.env.BACK4APPSECRET);
Parse.serverURL = "https://parseapi.back4app.com/";

//save data entry, keep track of user id and return the object
router.post("/save", async (req, res, next) => {
  try {
    const infoUser = req.body;

    const dataLogs = Parse.Object.extend("DataLog");
    var dataLog = new dataLogs();
    dataLog.set("userId", infoUser.id);
    dataLog.set("date", infoUser.date);
    dataLog.set("time", infoUser.time);
    dataLog.set("draintype", infoUser.draintype);
    dataLog.set("drainHSLArray", infoUser.drainHSLArray);
    dataLog.set("drainOutput", infoUser.drainOutput);
    dataLog.set("drainColor", infoUser.drainColor);
    dataLog.set("drainOutputPhotoLink", infoUser.drainOutputPhotoLink);
    dataLog.set("drainSkinSitePhoto", infoUser.drainSkinSitePhoto);
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

    const dataLogs = Parse.Object.extend("DataLog");
    var query = new Parse.Query(dataLogs);
    query.equalTo("userId", userId);
    query.find().then((results) => {
      let newDataLogs = [];
      for (let i = 0; i < results.length; i++) {
        const dataLog = results[i];
        const newDataLog = {
          id: dataLog.id,
          key: dataLog.id,
          time: dataLog.get("time"),
          userId: dataLog.get("userId"),
          date: dataLog.get("date"),
          drainOutput: dataLog.get("drainOutput"),
          drainColor: dataLog.get("drainColor"),
          drainOutputPhotoLink: dataLog.get("drainOutputPhotoLink"),
          drainSkinSitePhoto: dataLog.get("drainSkinSitePhoto"),
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

//check if a user has already entered data for a specific date
router.get("/check", async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const date = req.query.date;

    const dataLogs = Parse.Object.extend("DataLog");
    var query = new Parse.Query(dataLogs);
    query.equalTo("userId", userId);
    query.equalTo("date", date);
    query.find().then((results) => {
      if (results.length > 0) {
        res.send("true");
      } else {
        res.send("false");
      }
    });
  } catch (err) {
    next(err);
  }
});

//color extraction
router.get("/colors", async (req, res, next) => {
  const parseLink = req.query.parseLink;

  const IMAGGAAPIKEY = process.env.IMAGGAAPIKEY;

  const IMAGGASECRET = process.env.IMAGGASECRET;

  const url =
    "https://api.imagga.com/v2/colors?image_url=" +
    encodeURIComponent(parseLink);

  try {
    const response = await got.get(url, {
      username: IMAGGAAPIKEY,
      password: IMAGGASECRET,
    });
    const body = response.body;
    res.send(body);
  } catch (error) {}
});

module.exports = router;
