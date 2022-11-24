const express = require('express')

const productRouters = express.Router()

//Controllers
const { createProduct, getProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/product.controller')


productRouters.post('/', createProduct)
productRouters.get('/', getProduct)
productRouters.get('/:id', getProductById)

productRouters.patch('/:id', updateProduct)
productRouters.delete('/:id', deleteProduct)

module.exports = {productRouters}