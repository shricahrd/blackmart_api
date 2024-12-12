const { Router } = require("express");
const baseRouter = Router();
const basePath = "/api/v1/";
const userRoutes = require("../module/v1/user/routes/UserRoutes");
const masterRoutes = require("../module/v1/master/routes/MasterRoutes");

baseRouter.use("/user", userRoutes);
baseRouter.use("/master", masterRoutes);

module.exports = { baseRouter, basePath };
