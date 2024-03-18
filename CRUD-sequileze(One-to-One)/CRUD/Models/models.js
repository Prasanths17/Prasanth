const sequelize = require('../database/sequelizeConnection');
const DataTypes = require('sequelize');

const employeeInfo = sequelize.define('employeeInfo' , {
    id : {
        type : DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false 

    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    job_title:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
},{
    timestamps:false,
    freezeTableName:true
});

const employeeSalary = sequelize.define('employeeSalary' , {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    salary:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
});


employeeInfo.hasOne(employeeSalary, { foreignKey: 'id' });
employeeSalary.belongsTo(employeeInfo, { foreignKey: 'id' });


module.exports = {employeeInfo,employeeSalary};