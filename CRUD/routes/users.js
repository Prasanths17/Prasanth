var express = require('express');
var router = express.Router();

const pool = require('../Models/sqlConnection');
const { getAllEmployees, getAnEmployeeById, insertNewEmployee, updateAnEmployee, deleteAnEmployee } = require('../Controllers/one-to-one/rawQuery.controller');
/* GET users listing. */

router.get('/employeeInfo' , getAllEmployees);


router.get('/employeeInfo/:id' , getAnEmployeeById);

router.post('/employeeInfo' , insertNewEmployee);

router.put('/employeeInfo/:id' , updateAnEmployee);

// router.delete('/employeeInfo/:id' , (req,res) => {
//   const inputId = req.params.id;
//   pool.query(`delete from employeeInfo where id=${inputId}` , (err,result) => {
//       if(err){
//           console.log(err);
//           res.status(500).send(`Error in deleting the data`);
//           return;
//       }
//       pool.query(`delete from employeeSalary where id=${inputId}` , (err,result) => {
//         if(err){
//           console.log(err);
//           res.status(500).send(`Error in deleting the data`);
//         }else if(result.affectedRows==0){
//           console.log(result);
//           console.log("Invalid id");
//           res.status(404).send(`Give valid id`);
//         }else{
//           res.status(200).send('Employee details successfully deleted');
//         }
//       })
      
//   })
// })

router.delete('/employeeInfo/:id' , deleteAnEmployee);


module.exports = router;
