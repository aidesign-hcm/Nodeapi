const express = require('express')
const app = express()
const morgan = require('morgan')

// Import router
const productRouter = require('./api/routes/products')
const orderRputer = require('./api/routes/order')

// App Use Libary
app.use(morgan('dev'))

/// Routes Handel Requests 
app.use('/products', productRouter)
app.use('/order', orderRputer)

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    })
})

module.exports = app