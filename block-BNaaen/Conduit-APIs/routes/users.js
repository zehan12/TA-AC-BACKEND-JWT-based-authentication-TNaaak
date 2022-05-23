var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController");
var auth = require("../middlewares/auth")


router.post( "/register",userController.register );

router.post( "/login", userController.login );

router.get( "/all", userController.allUsers );

router.get( '/', auth.verifyToken, userController.currentUser );

router.put( '/', auth.verifyToken, userController.updateUser )

module.exports = router;
