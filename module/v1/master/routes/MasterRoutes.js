
const masterRoutes = require("express").Router();
const{
     getState, 
     getCity,
     getPage,
     getAppInfo
    } = require("../controller/MasterController");

const {        
        isValidUser
    } = require("../../user/middleware/userMiddleware");

masterRoutes.get("/state",isValidUser, getState);
masterRoutes.get("/city",isValidUser, getCity);
masterRoutes.get("/cms",isValidUser, getPage);
masterRoutes.get("/app-info",isValidUser, getAppInfo);

module.exports = masterRoutes;
