const mongoose = require('mongoose');

const ProductOrderSchema = mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: 'products',
            require: true,
        },
        order: {
            type: mongoose.Schema.Types.ObjectId, ref: 'orders',
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('product_orders', ProductOrderSchema);