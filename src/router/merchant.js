const express = require("express")
const controller = require("../controller")
const { validateLogin, validateRegister } = require("../middlewares/validators/validate-mer")
const upload = require("../middlewares/upload")

const merchRoute = express.Router()

merchRoute.get("/province", controller.merchant.getProvince)
merchRoute.post("/district", controller.merchant.getDistrict)
merchRoute.post("/sub-district", controller.merchant.getSubDistrict)

merchRoute.post("/menu", upload.single("img"), controller.merchant.createMenu)
merchRoute.delete("/menu/:id", controller.merchant.deleteMenu)
merchRoute.patch("/menu/:id", controller.merchant.updateMenu)
merchRoute.patch("/menu-img/:id", upload.single("img"), controller.merchant.updateMenuImg)
merchRoute.get('/province', controller.merchant.getProvince)
merchRoute.post('/district', controller.merchant.getDistrict)
merchRoute.post('/sub-district', controller.merchant.getSubDistrict)
merchRoute.post('/login',validateLogin,controller.merchant.login)
merchRoute.post('/register',validateRegister,controller.merchant.register)

module.exports = merchRoute
