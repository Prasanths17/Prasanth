//const chai = require('chai');
//import chai from 'chai';
const assert = require('assert');
const request = require('supertest');
const app = require('../../app');



describe.skip('getEmployees' , () => {
    it('to get all employees with salary' , async () => {
        const res = await request(app).get('/employeeInfo');
        
       
        assert.strictEqual(res.status, 200); 
        
        
        assert(Array.isArray(res.body)); 
        

        res.body.forEach(employee => {
            assert(employee.hasOwnProperty('id')); 
            assert(employee.hasOwnProperty('name')); 
            assert(employee.hasOwnProperty('Address')); 
            assert(employee.hasOwnProperty('job_title')); 
            assert(employee.hasOwnProperty('employeeSalary')); 
            
        })    
    })
})

describe.skip('getEmployeeById' , () => {
    it('to get an employees by id with salary' , async () => {
        
            const res = await request(app).get('/employeeInfo/3');
            assert.strictEqual(res.status, 200);
           // assert(Array.isArray(res.body));
            assert(res.body.hasOwnProperty('id')); 
            assert(res.body.hasOwnProperty('name')); 
            assert(res.body.hasOwnProperty('Address')); 
            assert(res.body.hasOwnProperty('job_title')); 
            assert(res.body.hasOwnProperty('employeeSalary'));
        
    })
})

describe.skip('insertEmployee' , () => {
    it('to insert an employee with salary' , async () => {
        const newEmployee = {
            name: "Mani",
            Address : "Valavanur",
            job_title : "CA",
            salary : 55000
        }
        const res = await request(app).post('/employeeInfo')
                    .send(newEmployee)
                    .expect(200);
        //console.log(res.body);
        assert.strictEqual(res.body.name, newEmployee.name);
        assert.strictEqual(res.body.Address, newEmployee.Address);
        assert.strictEqual(res.body.job_title, newEmployee.job_title);
        assert.strictEqual(res.body.employeeSalary.salary, newEmployee.salary);
        


    })
})

describe.skip('updateEmployee' , () => {
    it('to update a employee details' , async () => {
        const updateDetails = {
            "name": "kjurtgghjklhjkgug",
            "Address":"lifghnjm,lhkhg",
            "job_title":"Sahgjklleugs khvvv",
            "salary" : 100000
        }

        const res = await request(app).put('/employeeInfo/11').send(updateDetails).expect(200);
        //console.log(res);
        //expect(res.status).to.equal(200);
        assert.strictEqual(res.text, 'Employee details are successfully updated');
        
    })
})

describe('deleteEmployee' , () => {
    it.skip('to delete an employee' , async () => {
        const res = await request(app).delete('/employeeInfo/14').expect(200);
        assert.strictEqual(res.text , `Employee details are successfully deleted`);
    })

    it('to get an employees by id with salary' , async () => {
        
        const res = await request(app).get('/employeeInfo/14');
        assert.strictEqual(res.status, 404);
        assert.strictEqual(res.text , 'Requested employee Id is invalid');
        
    
    })
})