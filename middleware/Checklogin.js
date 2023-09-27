const jwt = require("jsonwebtoken");

const Checklogin = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = await authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    const { fname, lname, id, phone } = decoded;
    req.fname = fname;
    req.lname = lname;
    req.id = id;
    req.phone = phone;
    next();
  } catch {
    next("authontical failur");
  }
};
module.exports = Checklogin;
