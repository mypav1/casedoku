const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Person Schema
const PartsSchema = new Schema({
    prodName: String,
    prodDesc: String,
    manuName: String,
    manuContactPerson: String,
    manuContactNr: String,
    hqAddress: String,
    hqCity: String,
}, { collection: 'parts' });

// Create model
const Parts = mongoose.model('parts', PartsSchema);

module.exports = Parts;