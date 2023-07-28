const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });

//db connection
    sequelize.authenticate().then(() => {
        console.log(`Database connected to ${process.env.DB_DATABASE}`)
    }).catch((err) => {
        console.log(err,"Failed to connect the database")
    })

    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

db.users = require('./userModel') (sequelize, DataTypes)
module.exports = db;