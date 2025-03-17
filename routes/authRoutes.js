const express=require('express')
const {registerFarmer,loginFarmer} = require('../controllers/authController.js')

const router = express.Router()

router.post('/register',registerFarmer)
router.post('/login',loginFarmer)

module.exports = router