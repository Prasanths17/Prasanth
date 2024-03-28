const joi = require('joi');

const post_validation = joi.object({
    name:joi.string().pattern(/^[A-Za-z]+$/).trim(true).required(),
    Address:joi.string().pattern(/^[A-Za-z]+$/).trim(true).required(),
    productArray:joi.array().items(joi.number()) 
})

const put_validation = joi.object({
    Address:joi.string().pattern(/^[A-Za-z]+$/).trim(true).required(),
})

module.exports.newCustomerValidation= async(req,res,next) => {
    const {error} = post_validation.validate(req.body);
    if(error){
        return res.json(error.message);
    }else{
        next();
    }
}

module.exports.updateDetailsValidation = async(req,res,next) => {
    const {error} = put_validation.validate(req.body);
    if(error){
        return res.json(error.message);
    }else{
        next();
    }
}