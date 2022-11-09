const express = require('express')
const { orderRouters } = require('./routes/order.route')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors())

//Routes
const { productRouters } = require('./routes/product.route')



app.use('/products',productRouters)
app.use('/orders',orderRouters)


app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} does not exist in our server`
    })
})


module.exports = {app}