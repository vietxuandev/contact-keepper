const mongoose = require('mongoose');

const SupplierSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        phoneNumber: {
            type: String,
        },
        address: {
            type: String,
        },
        email: {
            type: String,
        },
        moreInfo: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('suppliers', SupplierSchema);
