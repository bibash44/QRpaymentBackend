 const app = require('express')()
 const bodyParser = require('body-parser')
 const cors = require('cors')
 const routes = require('./ROUTES')
 require('dotenv').config()
 const port = process.env.PORT

// 

 require('./DATABASE/dbcon')
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(cors())
 app.use(routes)
 app.listen(port, () => console.log(`Example app listening on port ${port}!`))