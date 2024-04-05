const employeeInfo = require('../../Models/employeeInfo');
const employeeSalary = require('../../Models/employeeSalary');
const sequelize = require('../../Models/sequelizeConnection')


module.exports.getEmployees = async(req,res) => {
       
    try{
        const employee = await employeeInfo.findAll({
            include : [employeeSalary]
        });
        
        res.json(employee);
      

    }catch(err){
        res.status(500).send(err);
    }
}

module.exports.getEmployeeById = async(req,res) => {
    try{
        const inputID = req.params.id;
        const employee = await employeeInfo.findOne({
            include : [employeeSalary],
            where : {
                id : inputID
            }
        });
        //console.log(employee);
        if(employee === null){
            res.status(404).send(`Requested employee Id is invalid`);
            return;
        }
        res.json(employee);
    }catch(err){
        res.status(500).send(err);
    }
    
}

module.exports.insertEmployee = async(req,res) => {
    try{   
        const {name,Address,job_title,salary} = req.body;
        

        const data = await employeeInfo.create({
            name,
            Address,
            job_title,
            employeeSalary : {salary}
        },{
            include:[employeeSalary]
        })
        //console.log(dd);

    res.status(200).json(data);
    }catch(err){
        res.status(500).send(err);
    }
    
}

module.exports.updateEmployee = async (req,res) => {
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
                where: { employee_id : userID },
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
    
}

module.exports.deleteEmployee =  async (req,res) => {
    const userID = req.params.id;
    try {
        await sequelize.transaction(async (t) => {
            
            const deletedEmployeeInfoRows = await employeeInfo.destroy({
                where: { id: userID },
                transaction: t
            });

            
            const deletedEmployeeSalaryRows = await employeeSalary.destroy({
                where: { employee_id: userID },
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
    
}


//module.exports = {getEmployees , getEmployeeById , insertEmployee , updateEmployee , deleteEmployee}