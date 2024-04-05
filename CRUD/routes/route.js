const express = require('express');
const router = express.Router();

const employeeInfo = require('../Models/employeeInfo');
const employeeSalary = require('../Models/employeeSalary');
const sequelize = require('../Models/sequelizeConnection');
const {getEmployees,getEmployeeById,insertEmployee,updateEmployee,deleteEmployee}=require('../Controllers/one-to-one/one_to_one.controller');
const { newEmployeeValidation } = require('../middlewares/one-to-one_middleware/employeeValidation');


router.get('/employeeInfo',getEmployees);

router.get('/employeeInfo/:id' , getEmployeeById);

router.post('/employeeInfo' ,newEmployeeValidation, insertEmployee);

router.put('/employeeInfo/:id' ,newEmployeeValidation, updateEmployee);

router.delete('/employeeInfo/:id' , deleteEmployee)

module.exports = router;