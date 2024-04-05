const { employee_schema } = require("../../Validations/one-to-one-validation/employee.validation");

module.exports.newEmployeeValidation = (req,res,next) => {
    const {error} = employee_schema.validate(req.body);
    if(error){
        return res.json(error.message);
    }else{
        next();
    }
    
}


