const app = module.exports= require('express')()
const transactionController = require('../CONTROLLER/transaction')

app.post('/',transactionController.makeTranscation)
app.get('/getall/:userid',transactionController.getAllTransaction)
app.get('/getone/:transactionid',transactionController.getSingleTransaction)