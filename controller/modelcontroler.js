const model = require("./../model/Model");
const moment = require("moment");

exports.registerfunction = async (req, res) => {
  const { fname, lname, email, phone, gender, status, location } = req.body;
  const file = req.file.filename;

  try {
    const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    const preuser = await model.findOne({ email: email });
    if (preuser) {
      res.status(400).json("the user is already exits");
    } else {
      const newuser = await model({
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        gender: gender,
        status: status,
        location: location,
        profile: file,
        datecreated,
      });
      const saveuser = await newuser.save();
      res.status(200).json(saveuser);
    }
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};
