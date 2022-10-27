const app = module.exports= require('express')()
const userController = require('../CONTROLLER/user')

app.post('/',userController.signUpUser)
app.get('/:userid',userController.getUserData)
app.post('/signin',userController.signInUser)
app.post('/signinorsignupgoogleuser',userController.signInOrSignUpGoogleUser)
app.put('/',userController.updateUser)
app.post('/verifyqrdata',userController.verifyQrData)