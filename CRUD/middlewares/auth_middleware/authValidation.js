const jwt = require ('jsonwebtoken');
require('dotenv').config();

module.exports.authenticateToken = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null)return res.status(401).send(`Token is required`);

    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err,decoded) => {
        if(err) return res.status(500).send(err);
        req.userData = decoded;
        next();
    })

}