const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handing GET request to /products'
    })
} )

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handing POST request to /products'
    })
} )

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message: 'You connect to the special ID',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'You connect to the normal ID',
            id: id 
        })
    }
} )

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'updated products'
    })
} )

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'delete products'
    })
} )


module.exports = router