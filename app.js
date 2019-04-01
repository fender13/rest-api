const express = require('express')
const app = express()
const cors = require('cors')

const ENV = require('dotenv')
ENV.config()

const port = Number(process.env.PORT) || 3000

const index = require('./routes/index')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/api', index)

app.listen(port, () => {
  console.log('SERVER IS ON AND IT LISTEN TO', port)
})