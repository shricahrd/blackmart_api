
require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

console.log("Establishing mysql DB Connection...");
const sequelize = new Sequelize(process.env.DB_NAME , process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        underscoredAll: true
        // timestamps: true,
        // underscored: false,
        // underscoredAll: false,
    },
    timezone: '+05:30',
    pool: {
        max: 10,
        min: 0,
        idle: 10000,
    },
    logging: false,
});
console.log(`Database (${process.env.ENVIRONMENT}) Connected :)`);
module.exports = { sequelize, QueryTypes };