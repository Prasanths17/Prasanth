const sequelize = require('./sequelizeConnection');
const DataTypes = require('sequelize');

const user = sequelize.define('user' , {

    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token : {
        type : DataTypes.STRING
    }
},{
    timestamps:false,
    freezeTableName:true
});

module.exports = user;
