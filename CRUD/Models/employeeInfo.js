const sequelize = require('./sequelizeConnection');
const DataTypes = require('sequelize');

const employeeSalary = require('./employeeSalary')

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


employeeInfo.hasOne(employeeSalary, { foreignKey: 'employee_id' });
employeeSalary.belongsTo(employeeInfo, { foreignKey: 'employee_id' });


module.exports = employeeInfo;