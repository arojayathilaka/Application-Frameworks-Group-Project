const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: { type: String, required: true},
    prodId: { type: Number, required: true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    comments: {type: String},
    ratings: {type: Number}
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;