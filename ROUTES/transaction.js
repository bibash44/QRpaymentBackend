const app = module.exports= require('express')()
const transactionController = require('../CONTROLLER/transaction')
const middleWare= require('../AUTH/auth')

app.post('/',middleWare,  transactionController.makeTranscation)
app.get('/getall/:userid',middleWare,transactionController.getAllTransaction)
app.get('/getone/:transactionid',middleWare,transactionController.getSingleTransaction)