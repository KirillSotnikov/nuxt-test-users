const express = require('express')
const bodyParser = require('body-parser')

// const authRoutes = require('./routes/auth.routes')

const keys = require('./keys')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// app.use('/api/auth', authRoutes)

module.exports = app
