const mongoose = require('mongoose');

const userSchm = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String
})
  
const User = mongoose.model("User", userSchm)
  
module.exports = User