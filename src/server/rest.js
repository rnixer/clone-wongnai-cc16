//=====================================================Imported Zone
const express = require("express")
const { json, urlencoded } = require("express")
const cors = require("cors")
const morgan = require("morgan")

//=====================================================local consted Zone

const { notFound } = require("../middlewares/notFound")
const { errorMiddlewares } = require("../middlewares/error")
const CustomError = require("../config/error")
const userRoute = require("../router/user")
const merchantRoute = require("../router/merchant")
const restaurantRoute = require("../router/restaurants")

//=====================================================Server Zone
module.exports = function restApiServer(app) {
  
    //=====================================================Encoding Zone
    app.use(morgan("dev"))
    app.use(cors())
    app.use(json())
    app.use(urlencoded({ extended: false }))
    app.use(express.static("public"))
    
    //=====================================================Routing Zone
    
    app.use("/ping", (req, res, next) => {
        try {
            console.log("Checking the API status: Everything is OK")
            res.status(200).json("pong")
        } catch (error) {
            next(new CustomError("Ping Error", "NotFoundData", 500))
        }
    })
    app.use("/user", userRoute)
    app.use("/merchant", merchantRoute)
    app.use("/restaurants", restaurantRoute)
   
    // app.use("/admin")

    //=====================================================Throwing Zone
    app.use(notFound)
    app.use(errorMiddlewares)
}
