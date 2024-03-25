const sequelize = require('./sequelizeConnection');
const DataTypes = require('sequelize');


const customerInfo = sequelize.define('customerInfo' , {
    customer_id : {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name : {
        type:DataTypes.STRING,
        allowNull:false
    },
    Address : {
        type:DataTypes.STRING,
        allowNull:false
    },
    product_id : {
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
});



module.exports = customerInfo;

