const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Cars Schema
const CarsSchema = new Schema({
    car_type: String,
    car_model: String,
    horsepower: String,
    fuel: String,
    transmition: String
}, { collection: 'cars' });

// Create model
const Cars = mongoose.model('cars', CarsSchema);

module.exports = Cars;