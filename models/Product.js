const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        unit: { type: mongoose.Schema.Types.ObjectId, ref: 'units' },
        supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'suppliers' },
        decription: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('products', ProductSchema);