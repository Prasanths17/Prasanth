const sequelize = require('./sequelizeConnection');
const DataTypes = require('sequelize');


const book = sequelize.define('book' , {
    book_id : {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    book_name : {
        type:DataTypes.STRING,
        allowNull:false
    },
    author_id : {
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
});



module.exports = book;

