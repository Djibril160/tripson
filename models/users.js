const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  ville: String,
  avatar: String,
  picture: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'pictures' }
}, { versionKey: false });

const User = mongoose.model('users', userSchema);

module.exports = User;