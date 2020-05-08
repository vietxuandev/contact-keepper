const mongoose = require('mongoose');

const SupplyingSchema = mongoose.Schema(
    {
        supplier: {
            type: mongoose.Schema.Types.ObjectId, ref: 'suppliers',
            require: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: 'products',
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
        },
        orderAt: {
            type: Date,
            default: Date.now
        },
        orderAt: {
            type: Date,
            default: Date.now
        },
        arrivesAt: {
            type: Date,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('supplyings', SupplyingSchema);