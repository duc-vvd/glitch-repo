const express = require("express");
const multer = require('multer');
const cloudinary = require('cloudinary');

const controller = require('../controllers/book.controller');
const validate = require('../validate/book.validate');

const upload = multer({dest: './public/uploads/'});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const router = express.Router();

router.get('/', controller.index);

router.get('/admin', controller.admin)

router.get('/create', controller.create);

router.get('/update/:id', controller.update);

router.get('/delete/:id', controller.delete)

router.post('/create', upload.single("cover"),validate.postCreate, controller.postCreate);

router.post('/update', upload.single("avatar"),validate.postUpdate, controller.postUpdate);

module.exports =  router;