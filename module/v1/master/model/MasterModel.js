
const { Sequelize } = require('sequelize');
const db = require("../../../../helper/dbConnection")
var sequelize = db.sequelize;

let countries = sequelize.define('countries', {
    sortname: Sequelize.STRING,
    phonecode: Sequelize.STRING,
    name: Sequelize.STRING,
    status: Sequelize.ENUM('0', '1'),
    is_deleted : Sequelize.ENUM('0', '1'),
})

let states = sequelize.define('states', {
    country_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    status: Sequelize.ENUM('0', '1'),
    is_deleted : Sequelize.ENUM('0', '1'),
})

let cities = sequelize.define('cities', {
    state_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    status: Sequelize.ENUM('0', '1'),
    is_deleted : Sequelize.ENUM('0', '1'),
})


let pages = sequelize.define('pages', {    
    slug: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    created_at : Sequelize.DATE,
    updated_at : Sequelize.DATE
})

let site_info = sequelize.define('site_info', {    
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    latitude: Sequelize.DOUBLE,
    longitude : Sequelize.DOUBLE,
    address : Sequelize.STRING
})


module.exports = {countries, states, cities, pages, site_info}