const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct); // Add auth middleware later
router.put('/:id', productController.updateProduct); // Add auth middleware later
router.delete('/:id', productController.deleteProduct); // Add auth middleware later

module.exports = router;
