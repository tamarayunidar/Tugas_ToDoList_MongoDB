const Todo = require('../models/todo');

module.exports = {
    createTodo: async (req, res) => {
        try {
            const data = req.body;
            data.userID = req.user._id;
            const todo = await Todo.create(data);
            res.status(201).json({
                message: "Todo created successfully",
                data: todo
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllTodo: async (req, res) => {
        try {
            const todos = await Todo.find({ userID: req.user._id });
            res.json({
                message: "Successfully retrieved todos",
                data: todos
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getTodoById: async (req, res) => {
        try {
            const todo = await Todo.findOne({ _id: req.params.id, userID: req.user._id });
            if (todo) {
                res.json({
                    message: "Successfully retrieved todo",
                    data: todo
                });
            } else {
                res.status(404).json({ message: "Todo not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateTodo: async (req, res) => {
        try {
            const updatedTodo = await Todo.findOneAndUpdate(
                { _id: req.params.id, userID: req.user._id },
                { $set: req.body },
                { new: true }
            );

            if (updatedTodo) {
                res.json({
                    message: "Todo updated successfully",
                    data: updatedTodo
                });
            } else {
                res.status(404).json({ message: "Todo not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteTodo: async (req, res) => {
        try {
            const deletedTodo = await Todo.findOneAndDelete({
                _id: req.params.id,
                userID: req.user._id
            });

            if (deletedTodo) {
                res.json({
                    message: "Todo deleted successfully",
                    data: deletedTodo
                });
            } else {
                res.status(404).json({ message: "Todo not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteAllTodo: async (req, res) => {
        try {
            const deletedTodos = await Todo.deleteMany({ userID: req.user._id });

            res.json({
                message: "All todos deleted successfully",
                data: deletedTodos
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
