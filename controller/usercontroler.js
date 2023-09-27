const user = require("./../model/Userschema");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.Register = async (req, res) => {
  const { fname, lname, email, phone, password, cpassword } = req.body;
  const hpass = await bcrypt.hash(password, 10);
  const chass = await bcrypt.hash(cpassword, 10);
  try {
    const preuser = await user.findOne({ email: email });
    if (preuser) {
      res.status(400).json("the user is already exits");
    } else {
      const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const newuser = await user({
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        password: hpass,
        cpassword: chass,
        datecreated,
      });
      const saveuser = await newuser.save();
      res.status(200).json({ status: 200, saveuser });
    }
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

exports.Login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const User = await user.find({ email });
    if (User && User.length > 0) {
      const validuser = await bcrypt.compare(password, User[0].password);
      if (validuser) {
        const token = jwt.sign(
          {
            fname: User[0].fname,
            lname: User[0].lname,
            id: User[0]._id,
            phone: User[0].phone,
          },
          process.env.SECRET,
          { expiresIn: "1h" }
        );

        res.cookie("uservalid", token, {
          maxAge: process.env.EXPIRE,
          httpOnly: true,
        });
        const result = { User, token };
        res.status(200).json({ status: 200, result });
      } else {
        res.status(400).json("authontical error");
      }
    } else {
      res.status(400).json("authenticals error");
    }
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//find singleuser

exports.singleuser = async (req, res) => {
  const { id } = req.params;
  try {
    const singleuser = await user.findById({ _id: id });
    res.status(200).json(singleuser);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

exports.sendemail = async (req, res) => {
  const { email } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const mailoptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "send messge for recovery",
      html: `<h1> sending message successfully</h1>`,
    };
    transporter.sendMail(mailoptions, (err, info) => {
      if (err) {
        res.status(400).json(err);
      } else {
        console.log("emailsent", +info.response);
        res.status(200).json(info);
      }
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

//all userger
exports.alluser = async (req, res) => {
  const search = req.query.search || "";
  const query = {
    fname: {
      $regex: search,
      $options: "i",
    },
  };
  try {
    const alluser = await user.find(query);
    res.status(200).json(alluser);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

exports.deleteuser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteuser = await user.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteuser);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("uservalid");
  res.status(200).json("logout successfull");
};
