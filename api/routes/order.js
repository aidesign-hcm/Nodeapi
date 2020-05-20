const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../modules/product')

const Order = require('../modules/Order')

router.get('/', (req, res, next) => {
    Order.find()
    .exec()
    .then(docs => {
        res.status(201).json({
            count : docs.length,
            orders: docs.map(doc => {
                return {
                    product: doc.product,
                    id: doc._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products/" + doc._id
                    }
                }
            })
        })
    })
    .catch( err => {
        console.log(err),
        res.status(500).json({
            error: err
        })
    });
} )

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(500).json({
                    message: 'Product Not Found'
                })
            }
            const order = new Order ({
                _id : mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save()
            .then(result => {
                res.status(201).json({
                    message: 'Order Susseccfuly',
                    createOrder: {
                        id: result._id,
                        product: result.product,
                        quantiy: result.quantity
                    },
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products/" + result._id
                    }
                })
            })
            .catch( err => {
                console.log(err),
                res.status(500).json({
                    error: err
                })
            });
        })
        .catch( err => {
            console.log(err),
            res.status(500).json({
                error: err
            })
        });
    
} )

router.get("/:orderId", (req, res, next) => {
    Order.findById(req.params.orderId)
      .populate('product')
      .exec()
      .then(order => {
        if (!order) {
          return res.status(404).json({
            message: "Order not found"
          });
        }
        res.status(200).json({
          order: order,
          request: {
            type: "GET",
            url: "http://localhost:3000/orders"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.delete("/:orderId", (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Order deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/orders",
            body: { productId: "ID", quantity: "Number" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router