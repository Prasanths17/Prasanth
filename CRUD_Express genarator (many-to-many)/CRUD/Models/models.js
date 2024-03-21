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
    }
},{
    timestamps:false,
    freezeTableName:true
});

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
})
customerInfo.belongsToMany(productInfo , {
    through: customerProduct,
    foreignKey : 'customer_id'
});
productInfo.belongsToMany(customerInfo , {
    through: customerProduct,
    foreignKey : 'product_id'
});


module.exports = {productInfo , customerInfo , customerProduct};

