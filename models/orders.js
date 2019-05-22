const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Orders Schema
const OrdersSchema = new Schema({
    order_date: String,
    reg_nr: String,
    customer_car: String,
    parts: String,
    shop: String,
    contact_person: String,
    price: String,


}, { collection: 'orders' });

// Create model
const Orders = mongoose.model('orders', OrdersSchema);

module.exports = Orders;