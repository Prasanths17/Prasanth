const joi = require ('joi');

module.exports.register_body_schema = joi.object({
    userName : joi.string().alphanum().min(4).max(12).required(),
    email : joi.string().email().required(),
    password : joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]+$/).min(8).max(15).required(),
})

module.exports.login_body_schema = joi.object({
    email : joi.string().email().required(),
    password : joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]+$/).min(8).max(15).required(),
})