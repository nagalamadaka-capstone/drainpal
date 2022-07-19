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
        let dataLogs = Parse.Object.extend("DataLogs");
        var dataLog = new dataLogs();
        dataLog.set("userId", infoUser.id);
        dataLog.set("date", infoUser.date);
        dataLog.set("time", infoUser.time);
        dataLog.set("drainType", infoUser.drainType);
        dataLog.set("drainSite", infoUser.drainSite);
        dataLog.set("healthcareProvider", infoUser.healthcareProvider);
        dataLog.set("drainoutput", infoUser.drainoutput);
        dataLog.set("draincolor", infoUser.draincolor);
        dataLog.set("drainoutputphoto", infoUser.drainoutputphoto);
        dataLog.set("drainskinsitephoto", infoUser.drainskinsitephoto);
        dataLog.set("painrating", infoUser.painrating);
        dataLog.set("sleepingrating", infoUser.sleepingrating);
        dataLog.set("nausearating", infoUser.nausearating);
        dataLog.set("bowelsrating", infoUser.bowelsrating);
        dataLog.set("appetiterating", infoUser.appetiterating);
        dataLog.set("breathingrating", infoUser.breathingrating);
        dataLog.set("fatiguerating", infoUser.fatiguerating);
        dataLog.set("symptoms", infoUser.symptoms);
        dataLog.set("concerns", infoUser.concerns);
    }catch(err){
        next(err);
    }
    
})

//fetch all data entries for a user
router.get('/', async (req, res, next) => {
    
});


module.exports = router;