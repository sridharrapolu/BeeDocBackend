const mongoose = require('mongoose');

const treatementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String,
            default: ""
        },
        public_id: {
            type: String,
            default: ""
        }
    }
}, { timestamps: true });
module.exports = mongoose.model('Treatements', treatementSchema);