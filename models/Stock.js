const mongoose = require('mongoose');

const StockSchema = mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: 'products',
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('stocks', StockSchema);