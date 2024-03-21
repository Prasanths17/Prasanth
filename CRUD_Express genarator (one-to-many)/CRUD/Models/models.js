const sequelize = require('../Database/sequelizeConnection');
const DataTypes = require('sequelize');

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

productInfo.hasMany(customerInfo , {foreignKey: 'product_id'});
customerInfo.belongsTo(productInfo , {foreignKey: 'product_id'});

module.exports = {productInfo , customerInfo};

