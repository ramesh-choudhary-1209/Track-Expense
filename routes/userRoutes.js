const express = require("express");
const { logincontroller } = require("../controllers/userController");
const { registercontroller } = require("../controllers/userController");



const router = express.Router();

//routes
//POST || LOGIN USER
router.post('/login',logincontroller)

//POST || REGISTER USER
router.post('/register',registercontroller);


module.exports = router;