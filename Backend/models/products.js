const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    Count: Number
})

exports.Product = mongoose.model('Product',productSchema);
