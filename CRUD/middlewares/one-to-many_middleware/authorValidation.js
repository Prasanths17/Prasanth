const { post_validation } = require("../../Validations/one-to-many-validation/authorBook.joiSchema");

module.exports.newAuthorValidation = (req,res,next) => {
    const {error} = post_validation.validate(req.body);
    if(error){
        return res.json(error.message);
    }else{
        next();
    }
}