const express = require('express')

const productRouters = express.Router()

//Controllers
const { createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/product.controller')


productRouters.post('/', createProduct)
productRouters.get('/', getProduct)

productRouters.patch('/:id', updateProduct)
productRouters.delete('/:id', deleteProduct)

module.exports = {productRouters}