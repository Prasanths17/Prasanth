var express = require('express');
//const { customerInfo, productInfo } = require('../Models/models');
const sequelize = require('../Models/sequelizeConnection');
var router = express.Router();

const  {getAuthors,getAuthorById,insertAuthor,updateAuthor,deleteAuthor} = require('../Controllers/one-to-many/author.controller');
const author = require('../Models/author');
const book = require('../Models/book');
const { newAuthorValidation } = require('../Controllers/one-to-many/authorBook.validation');

router.get('/author' , getAuthors);

router.get('/author/:id' , getAuthorById)

router.post('/author' ,newAuthorValidation, insertAuthor)

router.put('/author/:id' , updateAuthor);

router.delete('/author/:id' , deleteAuthor);


module.exports = router;