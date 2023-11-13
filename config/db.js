const mongoose = require('mongoose');
const DB_URL = "mongodb+srv://ToDoList:tamara@cluster0.zkypoz3.mongodb.net/tugas_ToDoList";
const db = mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = db;