const express = require('express');
const router = express.Router();
const {NotFoundError} = require('../utils/error');
var Parse = require("parse/node");
const BACK4APPKEY = require("../../client/src/securitykeys").BACK4APPKEY;
const BACK4APPSECRET = require("../../client/src/securitykeys").BACK4APPSECRET;

Parse.initialize(
  BACK4APPKEY,
  BACK4APPSECRET
);
Parse.serverURL = "https://parseapi.back4app.com/";

//save data entry, keep track of user id and return the object
router.post('/save', async (req, res, next) => {
    try{
        const infoUser = req.body;
        console.log('infoUser: ', infoUser);
        let dataLogs = Parse.Object.extend('DataLog');
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
        dataLog.set(infoUser.sliderArray[7], infoUser.sliderArrayValues[7]);
        dataLog.set("symptoms", infoUser.symptoms);
        dataLog.set("concerns", infoUser.concerns);
        dataLog.save()
        res.send("Data saved!");
    }catch(err){
        next(err);
    }
    
})

//fetch all data entries for a user
router.get('/', async (req, res, next) => {
    
});


module.exports = router;