const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const user = require ('../../Models/user');
require('dotenv').config();

module.exports.registeration = async(req,res) => {
    try{
        const {userName , email , password} = req.body;

        const userData = await user.findOne({
            where : {email : email}
        });

        if(userData){
            return res.status(400).send(`User already exist`);
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await user.create({
            userName,
            email,
            password : hashedPassword
        });

        const token = jwt.sign({
            user_id : newUser.id,
            email
        } , process.env.ACCESS_TOKEN_SECRET)

        //newUser.token = token
        newUserDetails= {
            ...newUser.dataValues,
            token : token
        }

        res.status(201).json(newUserDetails);

    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
    
}

module.exports.loginUser = async (req,res) => {
    try{
        const {email,password} = req.body;
        const userData = await user.findOne({where : {email : email}});

        //checking user exist
        if(!userData) return res.status(400).json({message : 'Invalid Credentials'});
        
        //checking password
        const isPasswordValid = await bcrypt.compare(password , userData.password);
        if(!isPasswordValid){
            return res.status(400).json({message : 'Invalid Password'});
        }
        
        const token = jwt.sign({user_id : userData.id , email} , process.env.ACCESS_TOKEN_SECRET);

        //userData.token = token;
        userDetails= {
            ...userData.dataValues,
            token : token
        }

        return res.status(200).json(userDetails);


    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
}

module.exports.getUser = async (req,res) => {
    try{
        const {user_id , email} = req.userData;
        console.log(req.userData);
       // console.log(userData);
        console.log(user_id);
        console.log(email);
        const req_user = await user.findOne({where : {id : user_id}});
        if(!req_user) return res.status(400).send(`Requested User not available in db`);
        res.status(200).json(req_user);
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
    
}