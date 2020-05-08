const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        startAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('projects', ProjectSchema);