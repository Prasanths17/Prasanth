const sequelize = require('./sequelizeConnection');
const DataTypes = require('sequelize');

//const employeeInfo = require('./employeeInfo');

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
    },
    employee_id :{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
});




module.exports = employeeSalary;
