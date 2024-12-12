
const { Sequelize } = require('sequelize');
const db = require("../../../../helper/dbConnection")
var sequelize = db.sequelize;

let Customer = sequelize.define('customers', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    country_code: Sequelize.STRING,
    phone: Sequelize.STRING,
    status: Sequelize.ENUM('0', '1'),
    is_deleted : Sequelize.ENUM('0', '1'),
    otp:Sequelize.STRING,
    expire_at:Sequelize.DATE,
    is_email_verified:Sequelize.BOOLEAN,
    email_verified_at:Sequelize.DATE,
})


module.exports = {Customer}