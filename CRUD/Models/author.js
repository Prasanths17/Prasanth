const sequelize = require('./sequelizeConnection');
const DataTypes = require('sequelize');

const book = require('./book')

const author = sequelize.define('author' , {
    author_id : {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    author_name:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
});


author.hasMany(book , {foreignKey: 'author_id'});
book.belongsTo(author , {foreignKey: 'author_id'});

module.exports = author;