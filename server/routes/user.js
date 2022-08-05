const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var Parse = require("parse/node");
const BACK4APPKEY = require("../../client/src/securitykeys").BACK4APPKEY;
const BACK4APPSECRET = require("../../client/src/securitykeys").BACK4APPSECRET;

Parse.initialize(BACK4APPKEY, BACK4APPSECRET);
Parse.serverURL = "https://parseapi.back4app.com/";

// Register the user passing the username, password and email
router.post("/register", async (req, res) => {
  const infoUser = req.body;

  var user = new Parse.User();
  //eventually will hash the password with bcrypt

  user.set("username", infoUser.email);
  user.set("password", infoUser.password);
  user.set("email", infoUser.email);
  user.set("firstname", infoUser.firstname);
  user.set("lastname", infoUser.lastname);
  user.set("draintype", infoUser.draintype);
  user.set("drainsite", infoUser.drainsite);
  user.set("healthcareprovider", infoUser.healthcareprovider);
  user.set("isDoctor", infoUser.isDoctor);

  try {
    await user.signUp();
    let rolesQuery = new Parse.Query(Parse.Role);

    //finds patient role by patient id
    let patientRole = await rolesQuery.get("NKdVAXnbFc");

    if (patientRole) {
      patientRole.getUsers().add(user);
      await patientRole.save();
    }
    res.send({ user: user });
  } catch (err) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  }
});

//trying to login
router.post("/login", async (req, res) => {
  const infoUser = req.body;

  try {
    const user = await Parse.User.logIn(infoUser.email, infoUser.password);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

//login with fb
router.post("/fblogin", async (req, res) => {
  const infoUser = req.body;
  try {
    // Gather Facebook user info
    const userId = infoUser.id;
    const userEmail = infoUser.email;
    const userAccessToken = infoUser.accessToken;

    // Try to login on Parse using linkWith and these credentials
    // Create a new Parse.User object
    const userToLogin = new Parse.User();

    // Set username and email to match facebook profile email
    userToLogin.set("username", userEmail);
    userToLogin.set("email", userEmail);
    userToLogin.set("isDoctor", false);

    try {
      const loggedInUser = await userToLogin.linkWith("facebook", {
        authData: { id: userId, access_token: userAccessToken },
      });

      // Update state variable holding current user
      let rolesQuery = new Parse.Query(Parse.Role);

      //finds patient role by patient id
      let patientRole = await rolesQuery.get("NKdVAXnbFc");

      if (patientRole) {
        patientRole.getUsers().add(loggedInUser);
        await patientRole.save();
      }
      res.send(loggedInUser);
      return true;
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection

      res.status(400).send({
        message: error.message,
      });
      return false;
    }
  } catch (error) {
    res.status(400).send({
      message: "Error gathering Facebook user info, please try again!",
    });
    return false;
  }
});

//trying to log out
router.post("/logout", async (req, res) => {
  try {
    await Parse.User.logOut();
    res.status(200).send({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

//changing profile info for users
router.post("/changeprofile", async (req, res) => {
  const info = req.body;
  const id = info.id;
  const key = info.key;
  const value = key === "phone" ? Number(info.value) : info.value;

  const params1 = { objectId: id, key: key, value: value };

  await Parse.Cloud.run("editUserProperty", params1);
});

//getting profile info for users
router.get("/getprofileinfo", async (req, res) => {
  const info = req.query;
  const key = info.key;
  const id = info.id;

  var query = new Parse.Query(Parse.User);
  const user = query.get(id);
  let attribute = (await user).attributes[key];

  res.send({ key: attribute });
});

//add doctors in parse user to provider role
router.post("/addDoctor", async (req, res, next) => {
  var query = new Parse.Query(Parse.User);
  query.equalTo("isDoctor", true);

  const doctors = await query.find();

  doctors.map(async (doctor) => {
    let rolesQuery = new Parse.Query(Parse.Role);
    let providerRole = await rolesQuery.get("deHeCFgWYE");

    providerRole.getUsers().add(doctor);
    await providerRole.save();
  });
  res.send("Doctors added to provider role successfully!");
});

//get doctors from User class in Parse
router.get("/getDoctors", async (req, res, next) => {
  var query = new Parse.Query(Parse.User);
  query.equalTo("isDoctor", true);

  let newDoctors = [];
  query.find().then(async (doctors) => {
    doctors.map(async (doctor) => {
      let doctorInfo = {
        id: doctor.id,
        firstname: doctor.get("firstname"),
        lastname: doctor.get("lastname"),
        email: doctor.get("username"),
        phone: doctor.get("phone"),
        hospital: doctor.get("hospital"),
      };
      newDoctors.push(doctorInfo);
    });

    res.send(newDoctors);
  });
});

//get patients for a specific doctor
router.get("/getPatients", async (req, res, next) => {
  var query = new Parse.Query(Parse.User);
  req.query.lastName = req.query.lastName.toLowerCase();
  query.equalTo("isDoctor", false);
  query.equalTo("healthcareprovider", req.query.lastName);

  let newPatients = [];
  query.find().then((patients) => {
    patients.map((patient) => {
      let patientInfo = {
        id: patient.id,
        firstname: patient.get("firstname"),
        lastname: patient.get("lastname"),
        email: patient.get("username"),
        draintype: patient.get("draintype"),
      };
      newPatients.push(patientInfo);
    });

    res.send(newPatients);
  });
});

// get alarming patients for specific doctor
router.get("/getAlarmingPatients", async (req, res, next) => {
  const doctorLastName = req.query.lastName.toLowerCase();

  const dataLogs = Parse.Object.extend("DataLog");
  var query = new Parse.Query(dataLogs);

  //find all datalogs with alarming hsl values
  let alarmingPatientsInfo = [];

  query.find().then((dataLogs) => {
    dataLogs.map((dataLog) => {
      let hsl = dataLog.get("drainHSL");

      let h = Number(hsl[0]).toFixed(2);
      let s = Number(hsl[1]).toFixed(2);
      let l = Number(hsl[2]).toFixed(2);

      if (((-1 < h && h < 42) || (h<360 && h>315)) && -1 < s && s < 100 && -1 < l && l < 100) {
        let dataLogInfo = {
          id: dataLog.get("userId"),
          date: dataLog.get("date"),
          time: dataLog.get("time"),
          drainColor: dataLog.get("drainColor"),
        };
        alarmingPatientsInfo.push(dataLogInfo);
      }
    });
    let alarmingPatients = [];

    var q = new Parse.Query(Parse.User);
    q.equalTo("isDoctor", false);
    q.equalTo("healthcareprovider", doctorLastName);
    q.find().then((patients) => {
      patients.map((patient) => {
        alarmingPatientsInfo.map((dataLogInfo) => {
          if (patient.id === dataLogInfo.id) {
            let patientInfo = {
              id: patient.id,
              firstname: patient.get("firstname"),
              lastname: patient.get("lastname"),
              email: patient.get("username"),
              draintype: patient.get("draintype"),
              date: dataLogInfo.date,
              time: dataLogInfo.time,
              drainColor: dataLogInfo.drainColor,
            };
            alarmingPatients.push(patientInfo);
            
          }
        });
      });
      res.send(alarmingPatients);
      
    });
  });
  //if datalog belongs to patient of doctor then add to array
});

/** Below are functions that were called once to set up database */
//create roles for providers and patients
router.post("/createRoles", async (req, res, next) => {
  var patientACL = new Parse.ACL();
  patientACL.setPublicReadAccess(true);
  patientACL.setPublicWriteAccess(true);
  var doctorACL = new Parse.ACL();
  doctorACL.setPublicReadAccess(true);
  doctorACL.setPublicWriteAccess(true);
  var providerRole = new Parse.Role("Provider", doctorACL);
  var patientRole = new Parse.Role("Patient", patientACL);
  await providerRole.save();
  await patientRole.save();
  res.send("Roles created successfully!");
});

//register doctors as users, will use this function when doctors are entered manually into spreadsheet
router.post("/registerDoc", async (req, res) => {
  let providers = Parse.Object.extend("Providers");
  var query = new Parse.Query(providers);
  let newDoctors = [];
  query.find().then((results) => {
    for (let i = 0; i < results.length; i++) {
      let doctor = results[i];
      let newDoctor = {
        id: doctor.id,
        key: doctor.id,
        firstName: doctor.get("firstName"),
        lastName: doctor.get("lastName"),
        email: doctor.get("email"),
        password: doctor.get("password"),
        phone: doctor.get("phone"),
        hospital: doctor.get("hospital"),
      };
      newDoctors.push(newDoctor);
    }
  });

  newDoctors.map((doctor) => {
    var user = new Parse.User();

    user.set("username", doctor.email);
    user.set("password", doctor.password);
    user.set("email", doctor.email);
    user.set("firstname", doctor.firstName);
    user.set("lastname", doctor.lastName);
    user.set("phone", doctor.phone);
    user.set("hospital", doctor.hospital);
    user.set("isDoctor", true);
    try {
      user.signUp();
      let rolesQuery = new Parse.Query(Parse.Role);
      let providerRole = rolesQuery.get("deHeCFgWYE");
      if (providerRole) {
        providerRole.getUsers().add(user);
        providerRole.save();
      }
    } catch (err) {}
  });
  res.send("Doctors registered successfully!");
});

module.exports = router;
