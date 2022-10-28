const app = module.exports= require('express')()
const transactionController = require('../CONTROLLER/transaction')

app.post('/',transactionController.makeTranscation)