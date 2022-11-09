const mongoose = require( 'mongoose')
const {Schema} = require('mongoose')

const productSchema = new Schema({
    name: String,
    category: String,
    unit_price: Number,
    status: {type: String, default:'active'}
})

const Product = mongoose.model('Product', productSchema)

module.exports = {Product}