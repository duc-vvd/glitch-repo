const multer = require("multer");
const cloudinary = require("cloudinary");
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

const upload = multer({ dest: "./public/uploads/" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = (req, res) => {
  res.render("profile/index");
};

module.exports.avatar = (req, res) => {
  res.render("profile/avatar");
};

module.exports.postIndex = (req, res) => {
  console.log(req.body);
  let data = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  
  User.findByIdAndUpdate(req.body.id, data).exec();
  res.redirect('/');
}

module.exports.postAvatar = (req, res) => {
  cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
    if(error){
      res.render('profile/index', {
        errors: ["Failed to update avatar image!"]
      });
      return;
    }
    User.findByIdAndUpdate(req.body.id, {avatarUrl: result.url}).exec();
  });
    res.redirect("/profile");
};
