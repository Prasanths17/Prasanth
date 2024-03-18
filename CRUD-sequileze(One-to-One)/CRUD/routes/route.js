const express = require('express');
const router = express.Router();

const {employeeInfo,employeeSalary} = require('../Models/models');
const sequelize = require('../database/sequelizeConnection');


router.get('/employeeInfo' , (req,res) => {
        
  
        const fun = async () => {
            const employee = await employeeInfo.findAll({
                include : [employeeSalary]
            })
            .then( (data) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).send(err);
            })
        }
        fun();
        
   
    
    
})



router.get('/employeeInfo/:id' , (req,res) => {
    const inputID = req.params.id;
    const fun = async () => {
        const employee = await employeeInfo.findAll({
            include : [employeeSalary],
            where : {
                id : inputID
            }
        }).then( (data) => {
            if(data.length == 0){
                res.status(404).send(`Requested employee Id is invalid`);
                return
            }
            res.json(data);
        }).catch(err => {
            res.status(500).send(err);
        });

        //console.log(employee);

        
        
    }

    fun();
})

router.post('/employeeInfo' , (req,res) => {
    const {namee,Addresss,job_titlee,salary} = req.body;
   const newEmployee = {
    name: namee,
    Address: Addresss,
    job_title: job_titlee
   }
   const empSalary = {
    salary : salary
   }
    const fun = async () => {
        await employeeInfo.create(newEmployee).then(data=>{
                employeeSalary.create(empSalary).then(data=>{
                res.send(`Employee details were successfully added :)`);
            }).catch(err=>{
                res.status(500).send(err);
                console.error(err);
            });
        }).catch(err=>{
            res.status(500).send(err);
            console.error(err);
        });

        
    }
    fun();
})

router.put('/employeeInfo/:id' , async (req,res) => {
    const userID = req.params.id;
    const {name,Address,job_title,salary} = req.body;
    //console.log(req.body);
    const newEmployee = {
     name: name,
     Address: Address,
     job_title: job_title
    }
    const empSalary = {
     salary : salary
    }
    
    try {
        await sequelize.transaction(async (t) => {
            // Update Address and City in employeeInfo
            const updatedEmployeeInfoRows = await employeeInfo.update(newEmployee, {
                where: { id: userID },
                transaction: t
            });

            // Update Salary in employeeSalary
            const updatedEmployeeSalaryRows = await employeeSalary.update(empSalary, {
                where: { id: userID },
                transaction: t
            });

            if (updatedEmployeeInfoRows == 0 && updatedEmployeeSalaryRows == 0) {
                console.log("Invalid id");
                res.status(404).send(`Invalid id or Same details are given for update`);
            } else {
                res.status(200).send(`Employee details are successfully updated`);
            }
        });
    } catch (error) {
        console.error('Error updating employee details:', error);
        res.status(500).send(`Error in updating the details`);
    }
    
})

router.delete('/employeeInfo/:id' , async (req,res) => {
    const userID = req.params.id;
    try {
        await sequelize.transaction(async (t) => {
            // Update Address and City in employeeInfo
            const deletedEmployeeInfoRows = await employeeInfo.destroy({
                where: { id: userID },
                transaction: t
            });

            // Update Salary in employeeSalary
            const deletedEmployeeSalaryRows = await employeeSalary.destroy({
                where: { id: userID },
                transaction: t
            });

            if (deletedEmployeeInfoRows == 0 && deletedEmployeeSalaryRows == 0) {
                console.log("Invalid id");
                res.status(404).send(`Invalid id`);
            } else {
                res.status(200).send(`Employee details are successfully deleted`);
            }
        });
    } catch (error) {
        console.error('Error deleting employee details:', error);
        res.status(500).send(`Error in deleteing the details`);
    }
    
})

module.exports = router;