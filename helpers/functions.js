const User = require('../models/User');
const Todo = require('../models/Todo');
exports.getCurUser = async(userId) => {
    try {

        // '646d0a7951b795af8e74b702'
        return await User.findById(userId);
    } catch (err) {
        console.log(err);
        res.status(400).send("Wrong User Id");
    }
};
exports.parseCookies = req => {
    const cookieStrArr = req.headers.cookie.split(' ');
    const cookies = {};
    cookieStrArr.forEach(cookieStr => {
        const arr = cookieStr.split("=");
        cookies[arr[0]] = arr[1];
    });
    return cookies;
}
exports.getUserTodos = async(userId, sortedByObj) => {
    const todos = await Todo.find({ user: userId }).populate('user').sort(sortedByObj)
    todos.sort((a, b) => {
        if (!a.dueDate && b.dueDate) {
            return 1;
        } else if (a.dueDate && !b.dueDate) {
            return -1;
        } else {
            return 0;
        }
    });
    return todos;
}