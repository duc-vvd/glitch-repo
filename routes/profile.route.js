const express = require("express");
const multer = require('multer');
const cloudinary = require('cloudinary');

const controller = require('../controllers/profile.controller');
const validate = require('../validate/profile.validate');

const upload = multer({dest: './public/uploads/'});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const router = express.Router();

router.get('/', controller.index);

router.get('/avatar', controller.avatar);

router.post('/',validate.postIndex, controller.postIndex);

router.post('/avatar',upload.single("avatar"),validate.postAvatar, controller.postAvatar);


module.exports = router;