const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    img: { data: Buffer, contentType: String},
    imgId: { type: Number, required: true }
}, {
    timestamps: true
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;