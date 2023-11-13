const express = require("express");
const route = express.Router();

const {
    createTodo,
    getAllTodo,
    getTodoById,
    updateTodo,
    deleteTodo,
    deleteAllTodo,
} = require("../controllers/todo.controller");

route.post("/", createTodo);
route.get("/", getAllTodo);
route.get("/:id", getTodoById);
route.put("/:id", updateTodo);
route.delete("/:id", deleteTodo);
route.delete("/", deleteAllTodo);

module.exports = route;
