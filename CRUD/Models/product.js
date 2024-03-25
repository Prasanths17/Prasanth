const sequelize = require('./sequelizeConnection');
const DataTypes = require('sequelize');

const product = sequelize.define('product' , {
    product_id : {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    product_name:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
});




module.exports = product;