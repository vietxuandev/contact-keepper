const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId, ref: 'projects',
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('orders', OrderSchema);