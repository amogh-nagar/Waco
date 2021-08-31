const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const ProductsControllers=require('../controllers/products-controllers')
const authcheck=require("../middleware/check-auth")

router.get('/:pid', ProductsControllers.getProductById);

router.get('/user/:uid', ProductsControllers.getProductByUserId);

router.use(authcheck)

router.post(
    '/',
    [
        (body('name').not().isEmpty(),
            body('details').isLength({ min: 5 })),
    ],
    ProductsControllers.createProduct
);

router.patch(
    '/:pid',
    [check('name').not().isEmpty(), check('details').isLength({ min: 5 })],
    ProductsControllers.updateProduct
);

router.delete('/:pid', ProductsControllers.deleteProduct);

module.exports = router;
