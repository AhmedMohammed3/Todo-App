const Todo = require('../models/Todo');

exports.getIndex = async(req, res, next) => {
    const curUser = req.user;
    if (!curUser) {
        return res.redirect('/login');
    }
    return Todo.find({ user: curUser.id }).populate('user').sort({ createdAt: -1 })
        .then(async todos => {
            userTodos = todos
                .map(item => ({
                    id: item.id,
                    text: item.text
                }));
            return res.render('index', {
                title: 'My Todo Items',
                todos: userTodos,
                user: curUser
            });
        })

};

exports.createTodo = async(req, res, next) => {
    const { text } = req.body;
    const curUser = req.user;
    if (!curUser) {
        return res.redirect('/login');
    }
    const todo = new Todo({
        text: text,
        user: curUser
    });
    const item = await todo.save();
    if (item) {
        console.log("Item Saved");
        return res.redirect(303, '/');
    }
    return res.status(500).send("Not Added");
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
    const text = req.body.text;
    const response = await Todo.findByIdAndUpdate(todoId, { text });

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