const express = require('express');
const bodyParser = require('body-parser');
const {createPool} = require('mysql2');

const PORT = 3300;
const app = express();

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"Prasanths@2001",
    database: "novastrid",
    connectionLimit: 10
})

app.use(bodyParser.json());


app.get('/employeeInfo' , (req,res) => {
    pool.query(`select * from employeeInfo as ei join employeeSalary as es on ei.employee_id=es.employee_id` , (err , result) => {
        if(err){
            console.log(err)
            res.status(500).send(`Error in retriving employeeInfo`);
        }
        else{
            res.status(200).json(result);
        }
    });
});


app.get('/employeeInfo/:id' , (req,res) => {
    const inputId = req.params.id;
    pool.query(`select * from employeeInfo as ei 
                join 
                employeeSalary as es 
                on ei.employee_id=es.employee_id
                where ei.employee_id=${inputId}` , (err , result) => {
                        
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

app.post('/employeeInfo' , (req,res) => {
    // const id = req.body.employee_id;
    // const name = req.body.employee_name;
    // const address = req.body.Address;
    // const job = req.body.job_title;
    // const City = req.body.city;
    // const Salary = req.body.salary;

    const {employee_id,employee_name,Address,job_title,city,salary} = req.body;
    console.log(req.body);
    // console.log(id);
    // console.log(name);
    // console.log(address);
    // console.log(job);
    // console.log(city);
    // console.log(salary);
   // pool.query(`insert into employeeInfo values (${id},${name},"${address}","${job}","${city}")` , (err,result) => {
    pool.query(`insert into employeeInfo values (?,?,?,?,?)`, [employee_id,employee_name,Address,job_title,city] , (err,result) => {    
        if(err){
            console.log(err);
            res.status(500).send(`Error in creating`);
            return;
        }
        pool.query(`insert into employeeSalary values (?,?)`,[employee_id,salary] , (err,result) => {
            if(err){
                console.log(err);
                res.status(500).send(`Error in creating`);
            }else{
                res.status(200).send(`Employee is successfully created`);
            }
        })
    })
})

app.put('/employeeInfo/:id' , (req,res) => {
    const inputId = req.params.id;
    const {Address,city,salary} = req.body;
    pool.query(`update employeeInfo as ei join employeeSalary as es 
                set ei.Address=? , ei.city=? , es.salary=?
                where ei.employee_id=${inputId}`, [Address,city,salary] , (err,result) => {
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

app.delete('/employeeInfo/:id' , (req,res) => {
    const inputId = req.params.id;
    pool.query(`delete from employeeInfo where employee_id=${inputId}` , (err,result) => {
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


app.listen(PORT , () => {console.log(`server is lisening on the port ${PORT}`)})