const jwt = require ('jsonwebtoken');
const { register_body_schema, login_body_schema } = require('../../Validations/Authentication-validation/auth.joiSchema');
require('dotenv').config();

module.exports.authenticateToken = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null)return res.status(401).send(`Token is required`);

    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err,decoded) => {
        if(err) return res.status(500).send(err);
        req.userData = decoded;
        next();
    })

}

module.exports.registerValidation = (req,res,next) => {
    const {error} = register_body_schema.validate(req.body);
    if(error){
        return res.json(error.message);
    }else{
        next();
    }
}

module.exports.loginValidation = (req,res,next) => {
    const {error} = login_body_schema.validate(req.body);
    if(error){
        return res.json(error.message);
    }else{
        next();
    }
}