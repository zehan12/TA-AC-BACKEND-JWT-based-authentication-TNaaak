var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController");

router.post( "/register",userController.register );

router.post( "/login", userController.login );

router.get( "/all", userController.allUsers );

module.exports = router;
