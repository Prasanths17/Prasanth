const express = require('express');
const multer = require('multer');
const path = require('path');
//const kj= require('../../views/index.html')
const PORT = 5000;

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'C:/Users/prasanth/Desktop/HTML/novastrid learning/fileupload_task/upload_dir');
    },
    filename : (req,file,cb) => {
        cb(null , file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

module.exports.upload = multer({storage : storage});

module.exports.pageToUpload = (req,res) => {
    res.sendFile('C:/Users/prasanth/Desktop/Prasanth/CRUD/views/index.html');
}

module.exports.imageUpload = (req,res) => {
    if(!req.file){
        return res.status(400).send('No files were uploaded.');
    }
    res.send('File uploaded successfully!');
}