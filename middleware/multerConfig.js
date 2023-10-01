const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowType=['image/png','image/jpg','image/jpeg']
    console.log(file.mimetype)
    if(!allowType.includes(file.mimetype)){
      return cb(new Error('only supports jpeg,jpg,png file'))
    }
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

module.exports = {
  multer,
  storage
};