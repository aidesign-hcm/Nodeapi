const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../modules/product')

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    id: doc._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products/" + doc._id
                    }
                }
            })
        }
        // if(docs.length >= 0){
            res.status(200).json(response)
        // } else {
        //     res.status(404).json({message : 'Product is emty'})
        // }
        
    })
    .catch( err => {
        console.log(err),
        res.status(500).json({error : err})
    })
} )

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message: 'created Product succes',
            createProduct: {
                name: result.name,
                price: result.price,
                id: result._id,
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/products/" + result._id
                }
            }
        })
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error : err})
    })
    
} )

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        if (doc){
            res.status(200).json({
                product: doc,
                request:{
                    type: 'GET',
                    url: "http://localhost:3000/products/"
                }
            });
            
        } else {
            res.status(404).json({message: 'Not Found Product'})
        }
        
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({error : err})
    })
} )

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.update({_id: id},{$set : updateOps})
    .exec()
    .then( result =>{
        res.status(200).json({
            createProduct: result,
            request: {
                type: 'GET',
                url: "http://localhost:3000/products/" +  id
            }
        })
    }
    )
    .catch( err => {
        console.log(err);
        res.status(500).json({error : err})
    })
} )

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'product deleted',
            url : 'http:localhost:3000/products',
            body:{
                name: 'String',
                price: 'Number'
            }
        })
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({error : err})
    })
} )


module.exports = router