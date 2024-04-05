const joi = require('joi');

module.exports.post_validation = joi.object({
    author_name : joi.string().pattern(/^[A-Za-z\s]+$/).trim(true).required(),
    book_name : joi.string().pattern(/^[A-Za-z\s]+$/).trim(true).required()
})

module.exports.put_author_validation = joi.object({
    author_name : joi.string().trim(true).required()
})

module.exports.put_book_validation = joi.object({
    book_name : joi.string().trim(true).required()
})



