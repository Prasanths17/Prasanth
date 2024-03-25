const sequelize = require('./sequelizeConnection');
const DataTypes = require('sequelize');


const customerProduct = sequelize.define('customerProduct' , {
    customerProductId : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    }
},{
    timestamps:false,
    freezeTableName:true
});



module.exports = customerProduct;