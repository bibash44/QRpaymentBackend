 const app = require('express')()
 const bodyParser = require('body-parser')
 const cors = require('cors')
 const routes = require('./ROUTES')
 const morgan= require('morgan')
 require('dotenv').config()
 const port = process.env.PORT

// 

 require('./DATABASE/dbcon')
 app.use(bodyParser.json())
 app.use(morgan('dev'))
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(cors())
 app.use(routes)
 app.listen(port, () => console.log(`Server listening on port ${port}!`))