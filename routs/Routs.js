const express = require("express");
const usercontroler = require("./../controller/usercontroler");
const modelcontroler = require("./../controller/modelcontroler");
const upload = require("./../multerconfig/Storageconfig");

const router = express.Router();

router.post("/api/post", usercontroler.Register);
//login router

router.post("/api/login", usercontroler.Login);

router.get("/api/singleuser/:id", usercontroler.singleuser);

//for email

router.post("/api/email", usercontroler.sendemail);

//getuser
router.get("/api/get", usercontroler.alluser);

//delete user
router.delete("/api/delete/:id", usercontroler.deleteuser);

//modelrouter

router.post(
  "/api/post1",
  upload.single("profile"),
  modelcontroler.registerfunction
);

router.get("/api/logout", (req, res) => {
  res.clearCookie("uservalid", { path: "/" });
  res.status(200).json("logoutsuccssfully");
});

module.exports = router;
