const app = module.exports= require('express')()
const userController = require('../CONTROLLER/user')

app.post('/',userController.signUpUser)
app.post('/signin',userController.signInUser)
app.post('/updateorsigninwithgoogle',userController.UpdateOrsignInWithGoogle)