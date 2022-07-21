const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var Parse = require("parse/node");
const BACK4APPKEY = require("../../client/src/securitykeys").BACK4APPKEY;
const BACK4APPSECRET = require("../../client/src/securitykeys").BACK4APPSECRET;

Parse.initialize(
  BACK4APPKEY,
  BACK4APPSECRET
);
Parse.serverURL = "https://parseapi.back4app.com/";

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
}
);


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
    console.log('err: ', err);
    
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

    try {
      const loggedInUser = await userToLogin.linkWith("facebook", {
        authData: { id: userId, access_token: userAccessToken },
      });

      // Update state variable holding current user
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
  const value = info.value;
  const key = info.key;
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

module.exports = router;
