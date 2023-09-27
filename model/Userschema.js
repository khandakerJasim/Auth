const mongoose = require("mongoose");
const validator = require("email-validator");

//create schema

const userschema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function() {
      return validator.validate(this.email);
    },
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  datecreated: {
    type: String,
  },
  dateupdated: {
    type: String,
  },
});

//create usermodel
const user = new mongoose.model("US", userschema);
module.exports = user;
