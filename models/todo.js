const mongoose = require('mongoose');

const todoSchm = new mongoose.Schema({
    inputTodo: String,
    completed: Boolean,
    userID: {
        type: mongoose.ObjectId,
        ref: 'User'
    }
})
  
const Todo = mongoose.model("Todo", todoSchm)
  
module.exports = Todo