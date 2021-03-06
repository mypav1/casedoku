const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Part Schema
const PartsSchema = new Schema({
    prodName: String,
    prodDesc: String,
    price: Number,
    manufacturer: {
        manuName: String,
        manuContactPerson: String,
        manuContactNr: String,
        hqAddress: String,
        hqCity: String,
    },
    instock: String,
}, { collection: 'parts' });

// Create model
const Parts = mongoose.model('parts', PartsSchema);

module.exports = Parts;