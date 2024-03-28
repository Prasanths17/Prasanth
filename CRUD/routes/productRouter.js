var express = require('express');
//const { customerInfo, productInfo } = require('../Models/models');
const sequelize = require('../Models/sequelizeConnection');
var router = express.Router();

const customer = require('../Models/customer');
const product = require('../Models/product');
const customerProduct = require('../Models/customerProduct');
const { getProducts, getProductById, insertProduct, updateProduct, deleteProduct } = require('../Controllers/many-to-many/product.controller');
const { productValidation } = require('../Controllers/many-to-many/product.validate');

router.get('/product' , getProducts)

router.get('/product/:id' , getProductById)

router.post('/product' ,productValidation,insertProduct);

router.put('/product/:id' ,productValidation, updateProduct);

router.delete('/product/:id' , deleteProduct);

module.exports = router;