const sequelize = require('./sequelizeConnection');
const DataTypes = require('sequelize');

const product = require('./product');
const customerProduct = require('./customerProduct');

const customer = sequelize.define('customer' , {
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
    }
},{
    timestamps:false,
    freezeTableName:true
});


customer.belongsToMany(product , {
    through: customerProduct,
    foreignKey : 'customer_id'
});
product.belongsToMany(customer , {
    through: customerProduct,
    foreignKey : 'product_id'
});


module.exports = customer;
