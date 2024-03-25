const sequelize = require('./sequelizeConnection');
const DataTypes = require('sequelize');

const customerInfo = require('./customerInfo')

const productInfo = sequelize.define('productInfo' , {
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


productInfo.hasMany(customerInfo , {foreignKey: 'product_id'});
customerInfo.belongsTo(productInfo , {foreignKey: 'product_id'});

module.exports = productInfo;