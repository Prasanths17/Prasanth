var express = require('express');
var router = express.Router();

const pool = require('../Models/sqlConnection');
/* GET users listing. */

router.get('/employeeInfo' , (req,res) => {
  pool.query(`select ei.id,ei.name,ei.Address,ei.job_title,es.salary,es.employee_id from employeeInfo as ei join employeeSalary as es on ei.id=es.employee_id` , (err , result) => {
      if(err){
          console.log(err)
          res.status(500).send(`Error in retriving employeeInfo`);
      }
      else{
          res.status(200).json(result);
      }
  });
});


router.get('/employeeInfo/:id' , (req,res) => {
  const inputId = req.params.id;
  pool.query(`select ei.id,ei.name,ei.Address,ei.job_title,es.salary,es.employee_id from employeeInfo as ei 
              join 
              employeeSalary as es 
              on ei.id=es.employee_id
              where ei.id=${inputId}` , (err , result) => {
                      
                  if(err){
                      console.log(err);
                      res.status(500).send(`Requested id is not present in the database`);
                  }else if(result.length == 0){
                      res.status(400).send(`Invalid employee_id`);
                  }else{
                      res.status(200).json(result);
                  }
              })
})

router.post('/employeeInfo' , async (req,res) => {

  const {name,Address,job_title,salary} = req.body;
  //console.log(req.body);
  
  pool.query(`insert into employeeInfo (name,Address,job_title) values (?,?,?)`, [name,Address,job_title] , (err,result) => {    
      if(err){
          console.log(err);
          res.status(500).send(`Error in creating`);
          return;
      }
      const employee_id = pool.query(`select id from employeeInfo where name = ?`,[name]);
      console.log(employee_id);
      //return;
      pool.query(`insert into employeeSalary (salary,employee_id) values (?,?)`,[salary,employee_id] , (err,result) => {
          if(err){
              console.log(err);
              res.status(500).send(`Error in creating`);
          }else{
              res.status(200).send(`Employee is successfully created`);
          }
      })
  })
})

router.put('/employeeInfo/:id' , (req,res) => {
  const inputId = req.params.id;
  const {name,Address,job_title,salary} = req.body;
  pool.query(`update employeeInfo as ei join employeeSalary as es 
              on ei.id=es.employee_id
              set ei.name=? , ei.Address=? , ei.job_title=? , es.salary=?
              where ei.id=${inputId}`, [name,Address,job_title,salary] , (err,result) => {
                  if(err){
                      console.log(err);
                      res.status(500).send(`Error in updating the details`);
                      
                  }else if(result.affectedRows==0){
                      console.log("Invalid id");
                      res.status(404).send(`Give valid id`);
                  }else{
                      //res.json(result);
                      res.status(200).send(`Employee details are successfully updated`);
                  }
              })
})

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

router.delete('/employeeInfo/:id' , (req,res) => {
  const inputId = req.params.id;
  pool.query(`delete from employeeInfo where id=${inputId}` , (err,result) => {
      if(err){
          console.log(err);
          res.status(500).send(`Error in deleting the data`);
      }else if(result.affectedRows==0){
          console.log("Invalid id");
          res.status(404).send(`Give valid id`);
      }else{
          res.status(200).send('Employee details successfully deleted');
      }
  })
})


module.exports = router;
