var express = require('express');
//const { customerInfo, productInfo } = require('../Models/models');

var router = express.Router();

const author = require('../Models/author');
const book = require('../Models/book');
const { getBooks, getBooksById, insertBook, updateBook, deleteBook } = require('../Controllers/one-to-many/book.controller');

/* GET users listing. */
router.get('/book', getBooks);

router.get('/book/:id' , getBooksById);
  
router.post('/book' , insertBook);

router.put('/book/:id' , updateBook);

router.delete('/book/:id' , deleteBook);

module.exports = router;
