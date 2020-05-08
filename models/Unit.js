const mongoose = require('mongoose');

const UnitSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('units', UnitSchema);