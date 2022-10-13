const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    subject: {
        type: String,
        required: true
    }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;