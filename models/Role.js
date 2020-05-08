const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('roles', RoleSchema);