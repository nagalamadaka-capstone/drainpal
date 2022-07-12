const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var Parse = require('parse/node');

Parse.initialize("FYm3VuO0u2fZehFsYlcKZSuloKs5Bf75EBJUhGf7","CWltjX0VqknaSsdHrgoTjVWhCDGrUGINIO6dEqUB"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/'

// Register the user passing the username, password and email
router.post("/register", async (req, res) => {
  let infoUser = req.body;
  var user = new Parse.User();

//   try{
//     const hashedPassword = await bcrypt.hash(infoUser.password, 10);
//   }
//   catch{
//     res.status(400).send({error: "Password is not valid"});
//   }

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
    res.json(user)
  } catch (err) {
    
    res.status(err.status || 500);
    res.json({
    message: err.message,
    error: err
    });
  }
});

//trying to login
router.post("/login", async (req, res) => {

    let infoUser = req.body;
    console.log('infoUser: ', infoUser);
    
    try {
      let user = await Parse.User.logIn(
        infoUser.email,
        infoUser.password
      );
      res.status(200).json(user);
      
      
    } catch (error) {
        
      res.status(400).json({
        error: error.message,
        error: error
      });
    }
  });

//trying to log out
router.post("/logout", async (req, res) => {
    try {
        await Parse.User.logOut();
        res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        res.json({
            error: error.message,
            error: error
        });
    }
}
);

//trying to get the current user
router.get("/current", async (req, res) => {
    try {
        let user = await Parse.User.current();
        
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            error: error.message,
            error: error
        });
    }
}
);


module.exports = router;
