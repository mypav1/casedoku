const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Orders Schema
const OrdersSchema = new Schema({
    order_date: String,
    reg_nr: String,
    customer: {
        first_name: String,
        last_name: String,
        phoneNr: String,
        address: String,
        zip_code: String,
    },
    parts: String,
    shop: {
        contact_person: String,
        contact_number: String,
        contact_address: String,
        contact_city: String,
    },
    price: String,


}, { collection: 'orders' });

// Create model
const Orders = mongoose.model('orders', OrdersSchema);

module.exports = Orders;