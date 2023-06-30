const url = require('url');

const Todo = require('../models/Todo');
const { getUserTodos } = require('../helpers/functions');

exports.getIndex = async(req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.redirect('/login');
    }
    const todos = await getUserTodos(user.id, { dueDate: 1 });
    const { error } = req.query;
    return res.render('index', {
        title: 'My Todo Items',
        todos,
        user,
        error,
        rushPeriod: 1
    });
};

exports.createTodo = async(req, res, next) => {
    const { text, dueDate } = req.body;
    const user = req.user;
    if (!user) {
        return res.redirect('/login');
    }
    try {
        if (!text || text.trim() == '') {
            throw new Error("Empty Fields");
        }
        if (dueDate && new Date(dueDate).getTime() < new Date().getTime()) {
            throw new Error("Due Date is behind today");
        }
        const todo = new Todo({
            text,
            user,
            dueDate
        });
        const item = await todo.save();
        if (!item) {
            throw new Error("Item not saved");
        }
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return res.redirect(url.format({
            pathname: "/",
            query: {
                "error": err.message
            }
        }));
    }
};

exports.deleteTodo = async(req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    const todoId = req.params.id;
    const response = await Todo.findByIdAndDelete(todoId);
    if (!response) {
        return res.status(500).json({ message: "Not Deleted" });
    }
    console.log("Item Deleted");
    return res.json({ message: "Todo Deleted" });
}

exports.updateTodo = async(req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    const todoId = req.params.id;
    const { text, dueDate } = req.body;
    const response = await Todo.findByIdAndUpdate(todoId, { text, dueDate });

    if (!response) {
        return res.status(500).json({ message: "Not Updated" });
    }
    console.log("Item Updated");
    return res.json({ message: "Todo Updated" });
}

exports.getAllTodos = async(req, res, next) => {
    return Todo.find().populate('user').sort({ createdAt: -1 })
        .then(async todos => {
            userTodos = todos
                .map(item => ({
                    id: item.id,
                    text: item.text,
                    owner: item.user
                }));
            return res.render('allTodos', {
                title: 'All Todo Items',
                todos: userTodos,
                user: req.user
            });
        })
}