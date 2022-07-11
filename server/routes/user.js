const express = require("express");
const router = express.Router();
var Parse = require('parse/node');

Parse.initialize("FYm3VuO0u2fZehFsYlcKZSuloKs5Bf75EBJUhGf7","CWltjX0VqknaSsdHrgoTjVWhCDGrUGINIO6dEqUB"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/'


//trying to login
router.post("/login", async (req, res) => {
  let infoUser = req.body;

  try {
    let user = await Parse.User.logIn(
      infoUser.usernameLogin,
      infoUser.passwordLogin
    );
    res.render("index", {
      loginMessage: "User logged in!",
      RegisterMessage: "",
      typeStatus: "success",
      infoUser: infoUser,
    });
  } catch (error) {
    res.render("index", {
      loginMessage: error.message,
      RegisterMessage: "",
      typeStatus: "danger",
      infoUser: infoUser,
    });
  }
});

// Register the user passing the username, password and email
router.post("/register", async (req, res) => {

  let {infoUser} = req.body;
  var user = new Parse.User();
  console.log('infoUser.usernameRegister: ', infoUser.usernameRegister);

  user.set("username", infoUser.usernameRegister);
  user.set("password", infoUser.passwordRegister);
  user.set("email", infoUser.emailRegister);
  console.log("user", user.attributes);

  try {
    await user.signUp();
    res.json(user)
  } catch (err) {
    console.log('error: ', err);
    res.status(err.status || 500);
    res.json({
    message: err.message,
    error: err
    });
    // res.json("index", {
    //   loginMessage: "",
    //   RegisterMessage: error.message,
    //   typeStatus: "danger",
    //   infoUser: infoUser,
    // });
  }
});

module.exports = router;
