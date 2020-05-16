const express = require('express')
const app = express()

// Import router
const productRouter = require('./api/routes/products')
const orderRputer = require('./api/routes/order')

app.use('/products', productRouter)
app.use('/order', orderRputer)

module.exports = app