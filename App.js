const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const employeeData = require('./router/api-employee')
// const url = require('url')
// const writeDb = writeFileSync(db, )


app.disable('x-powered-by')


app.use(express.json())

app.set('json spaces', 2)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/api/employees', employeeData)

app.listen(4000, ()=>{
    console.log('Listening on port 4000......')
})
