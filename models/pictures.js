const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
  country: String,
  picture: [String]
}, { versionKey: false });

const Picture = mongoose.model('pictures', pictureSchema);

module.exports = Picture;