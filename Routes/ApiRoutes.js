const express =require("express")
const ApiData = require("../Api/ApiData")
const Data= express.Router()
Data.route("/").get(ApiData.apiController)
module.exports = Data