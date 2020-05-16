const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Your All Order'
    })
} )

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'you created Order'
    })
} )

router.get('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    res.status(200).json({
        message: 'Order was Create',
        id: id
    })
} )

router.delete('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    res.status(200).json({
        message: 'Order was delete',
        id: id
    })
} )

module.exports = router