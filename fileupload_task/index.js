const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'C:/Users/prasanth/Desktop/HTML/novastrid learning/fileupload_task/upload_dir');
    },
    filename : (req,file,cb) => {
        cb(null , file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage : storage});


app.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html');
});


app.post('/upload' , upload.single('image') , (req,res) => {
    if(!req.file){
        return res.status(400).send('No files were uploaded.');
    }
    res.send('File uploaded successfully!');
});

app.listen(PORT , () => {
    console.log(`Server is running on post ${PORT}`)
})

