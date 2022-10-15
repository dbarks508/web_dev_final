const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;

// module.exports = function Cart(Subject) {
//     this.subjects = Subject.items || {};
//     this.totalQty = Subject.totalQty || 0;
//     this.totalPrice = oldCart.totalPrice || 0;

// this.add = function (subject, id) {
//     let storedItem = this.subjects[id];
//     if (!storedItem) {
//         storedItem = this.subjects[id] = {subject: subject, qty: 0, price: 0};
//     }
//     storedItem.qty++;
//     storedItem.price = storedItem.item.price * storedItem.qty;
//     this.totalQty++;
//     this.totalPrice += storedItem.item.price;
// };

// this.reduceByOne = function (id) {
//     this.items[id].qty--;
//     this.items[id].price -= this.subjects[id].subject.price;
//     this.totalQty--;
//     this.totalPrice -= this.subjects[id].subject.price;

//     if(this.items[id].qty <= 0) {
//         delete this.items[id];
//     }
// };

// this.removeItem = function (id) {
//     this.totalQty -= this.subjects[id].qty;
//     this.totalPrice -= this.subjects[id].price;
//     delete this.items[id];
// };
// }
