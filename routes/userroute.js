const express=require('express')
const {SignUp,Login} = require('../controller/userController')


const userroute=express.Router()

userroute.post('/signup',SignUp)
userroute.post('/login',Login)

module.exports=userroute