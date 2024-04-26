const express = require('express');
const multer = require('multer');
const path = require('path');
const { pageToUpload, imageUpload } = require('../Controllers/fileUploader/fileUploader.controller');
const {upload} = require('../Controllers/fileUploader/fileUploader.controller');
const router = express.Router(); 

router.get('/page', pageToUpload);


router.post('/upload' , upload.single('image') , imageUpload);

module.exports = router;


 