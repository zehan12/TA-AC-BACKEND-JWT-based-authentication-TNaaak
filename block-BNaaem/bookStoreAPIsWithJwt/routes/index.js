var express = require('express');
var router = express.Router();
var auth = require("../middlewares/auth");

/* GET home page. */
router.get('/', auth.verifyToken,  function(req, res, next) {
  console.log(req.users)
  res.render('index', { title: 'Express' });
});

module.exports = router;
