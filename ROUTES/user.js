const app = module.exports= require('express')()
const userController = require('../CONTROLLER/user')
const middleWare= require('../AUTH/auth')

app.post('/',userController.signUpUser)
app.post('/signin',userController.signInUser)
app.post('/signinorsignupgoogleuser',userController.signInOrSignUpGoogleUser)

app.get('/:userid', middleWare, userController.getUserData)
app.put('/:userid',middleWare, userController.updateUser)
app.post('/verifyqrdata', middleWare, userController.verifyQrData)
app.post('/sendemail',middleWare, userController.sendEmail)