const express = require('express')
const router = express.Router();
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')

const productController = require('../controllers/products')

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', productController.products_get_all )

router.post("/", checkAuth, upload.single('productImage'), productController.products_create_product);

router.get('/:productId', productController.products_get_product)

router.patch('/:productId', checkAuth, productController.products_update_product)

router.delete('/:productId', checkAuth, productController.products_delete)


module.exports = router