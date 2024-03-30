const joi = require('joi');

const post_validation = joi.object({
    author_name : joi.string().pattern(/^[A-Za-z\s]+$/).trim(true).required(),
    book_name : joi.string().pattern(/^[A-Za-z\s]+$/).trim(true).required()
})

const put_author_validation = joi.object({
    author_name : joi.string().trim(true).required()
})

const put_book_validation = joi.object({
    book_name : joi.string().trim(true).required()
})

module.exports.newAuthorValidation = (req,res,next) => {
    const {error} = post_validation.validate(req.body);
    if(error){
        return res.json(error.message);
    }else{
        next();
    }
}

