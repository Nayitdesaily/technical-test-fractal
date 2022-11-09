const mongoose = require( 'mongoose')
const {Schema} = require('mongoose')

const orderSchema = new Schema({
    status: {type: String, default: 'pending'},
    date: {type: Date, default: Date.now},
    customer: String,
    order_items:[],
    sub_total: {type:Number, default:null},
    taxes_amount: {
        city_tax: {type:Number, default:null},
        country_tax: {type:Number, default:null},
        state_tax: {type:Number, default:null},
        federal_tax: {type:Number, default:null}
    },
    total_taxes: {type:Number, default:null},
    total_amount: {type:Number, default:null}
})

const Order = mongoose.model('Order', orderSchema)

module.exports = {Order}