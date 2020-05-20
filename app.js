const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


// Import router
const productRouter = require('./api/routes/products')
const orderRputer = require('./api/routes/order')

mongoose.connect('mongodb+srv://aidesign:' + process.env.MONGO_ATLAS_PW + '@cluster0-0oqrv.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true })
mongoose.Promise = global.Promise;

// App Use Libary

app.use(morgan('dev'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// CROS Cross-origin resource sharing
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
    }
  next();
});

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