const joi = require('joi');

const validation = joi.object({
    product_name : joi.string().pattern(/^[A-Za-z]+$/).trim(true).required()
})

module.exports.productValidation = async(req,res,next) => {
    const {error} = validation.validate(req.body);
    if(error){
        return res.json(error.message);
    }else{
        next();
    }
}




