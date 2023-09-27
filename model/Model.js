const mongoose = require("mongoose");
const validator = require("email-validator");

//create schema

const useschema = new mongoose.Schema({
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
  },
  profile: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  status: {
    type: String,

    required: true,
    enums: ["Active", "Inactive"],
    default: "Active",
  },
  location: {
    type: String,
    required: true,
  },
  datecreated: {
    type: String,
  },
  dateupdated: {
    type: String,
  },
});

//create model

const model = new mongoose.model("usermmodel", useschema);

module.exports = model;
