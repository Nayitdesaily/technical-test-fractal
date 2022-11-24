const mongoose = require( 'mongoose')
const {Schema} = require('mongoose')

const orderItemSchema = new Schema({
    quantity: Number,
    cost: Number,
    orderId: String,
    productId: String,
    status: {type:String, default: 'active'}
})

const OrderItem = mongoose.model('OrderItem', orderItemSchema)

module.exports = {OrderItem}