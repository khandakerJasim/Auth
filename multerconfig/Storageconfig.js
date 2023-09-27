const multer = require("multer");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const filename = `images-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("only jpg jpeg and png file are allowed"));
  }
};
const upload = multer({
  storage: Storage,
  fileFilter: filefilter,
});

module.exports = upload;
