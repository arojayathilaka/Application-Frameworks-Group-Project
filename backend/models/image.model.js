const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    img: { data: Buffer, contentType: String}
}, {
    timestamps: true
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;