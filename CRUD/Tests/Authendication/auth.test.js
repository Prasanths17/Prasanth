const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

describe.skip('Registration' , () => {
    try{
        
        it('Tring to register a new user' , async () => {

            const userDetails = {
                "userName" : "ith",
                "email" : "inoth@gmail.com",
                "password" : "inoth2001"
            }

            const res = await request(app).post('/register').send(userDetails).expect(201);
            assert(res.body.hasOwnProperty('id'));
            assert(res.body.hasOwnProperty('userName'));
            assert(res.body.hasOwnProperty('email'));
            assert(res.body.hasOwnProperty('password'));
            assert(res.body.hasOwnProperty('token'));
            var registration_created_Token = res.body.token;
        })

        it('Tring to register a existing user' , async() => {
            const userDetails = {
                "userName" : "Aarthi",
                "email" : "aarthi@gmail.com",
                "password" : "aarthi2001"
            }

            const res = await request(app).post('/register').send(userDetails).expect(400);
            assert.strictEqual(res.text , `User already exist`);    
        })
    }catch(err){
        throw err;
    }
    
})

describe.skip("loginUser" , () => {
    try{
        it('Tring to login a existing user with valid credentials' , async () => {
            const loginDetails = {
                "email" : "prasanth@gmail.com",
                "password" : "prasanth2001"
            }
    
            const res = await request(app).post('/login').send(loginDetails).expect(200);
            assert(res.body.hasOwnProperty('id'));
            assert(res.body.hasOwnProperty('userName'));
            assert(res.body.hasOwnProperty('email'));
            assert(res.body.hasOwnProperty('password'));
            assert(res.body.hasOwnProperty('token'));
            var login_created_token = res.body.token;
        })

        it('Tring to login a existing user with invalid credentials' , async () => {
            const loginDetails = {
                "email" : "prasanth@gmail.com",
                "password" : "asanth2001"
            }
    
            const res = await request(app).post('/login').send(loginDetails).expect(400);
            assert.strictEqual(res.body.message , `Invalid Password`);
        })
    }catch(err){
        throw err
    }
    
})

describe.skip("getUser" , () => {
    try{
        
        it('Tring to get user details by the created token' , async () => {
            const created_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6InByYXNhbnRoQGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyNTE4M30.a_ygjVGsGcMQyQF--ULlhPZ0jUpJSkMho0-otk4qs2U`;
            const res = await request(app).get('/userInfo').set('Authorization' , `Bearer ${created_token}`).expect(200);
            assert(res.body.hasOwnProperty('id'));
            assert(res.body.hasOwnProperty('userName'));
            assert(res.body.hasOwnProperty('email'));
            assert(res.body.hasOwnProperty('password'));
        })

        it('Tring to get an user with empty token' , async () => {
            const created_token = " ";
            const res = await request(app).get('/userInfo').set('Authorization' , `Bearer ${created_token}`).expect(401);
        })
    }catch(err){
        throw err;
    }
})