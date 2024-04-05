const joi = require('joi');

module.exports.employee_schema = joi.object({
    name : joi.string().pattern(/^[A-Za-z\s]+$/).min(3).max(15).required(),
    Address : joi.string().alphanum().min(4).max(50).required(),
    job_title : joi.string().pattern(/^[A-Za-z\s]+$/).min(5).max(25).required(),
    salary : joi.number().min(8000).max(75000).required()
})