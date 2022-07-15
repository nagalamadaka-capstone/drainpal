const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var Parse = require("parse/node");

Parse.initialize(
  "FYm3VuO0u2fZehFsYlcKZSuloKs5Bf75EBJUhGf7",
  "CWltjX0VqknaSsdHrgoTjVWhCDGrUGINIO6dEqUB"
);
Parse.serverURL = "https://parseapi.back4app.com/";

// Register the user passing the username, password and email
router.post("/register", async (req, res) => {
  let infoUser = req.body;
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
    res.send({ user: user });
    res.json(user);
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  }
});

//trying to login
router.post("/login", async (req, res) => {
  let infoUser = req.body;

  try {
    let user = await Parse.User.logIn(infoUser.email, infoUser.password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//login with fb
router.post("/fblogin", async (req, res) => {
  let infoUser = req.body;
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
      let loggedInUser = await userToLogin.linkWith("facebook", {
        authData: { id: userId, access_token: userAccessToken },
      });

      // Update state variable holding current user
      res.json(loggedInUser);
      return true;
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection

      res.status(400).json({
        message: error.message,
      });
      return false;
    }
  } catch (error) {
    res.status(400).json({
      message: "Error gathering Facebook user info, please try again!",
    });
    return false;
  }
});

//trying to log out
router.post("/logout", async (req, res) => {
  try {
    await Parse.User.logOut();
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

//changing profile info for users
router.post("/changeprofile", async (req, res) => {
  let info = req.body;
  let id = info.id;
  let value = info.value;
  let key = info.key;
  const params1 = { objectId: id, key: key, value: value };
  const editedUser = await Parse.Cloud.run("editUserProperty", params1);
});

//getting profile info for users
router.post("/getprofileinfo", async (req, res) => {
    let info = req.body;
    let key = info.key;
    let id = info.id;
    const q = new Parse.Query(Parse.User);
}
);


module.exports = router;
