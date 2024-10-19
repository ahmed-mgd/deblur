const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    originalPath: { type: String, required: true },
    deblurredPath: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
