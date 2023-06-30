const User = require('../models/User');
exports.getCurUser = async(userId) => {
    try {

        // '646d0a7951b795af8e74b702'
        return await User.findById(userId);
    } catch (err) {
        console.log(err);
        res.status(400).send("Wrong User Id");
    }
};
exports.parseCookies = (req) => {
    const cookieStrArr = req.headers.cookie.split(' ');
    const cookies = {};
    cookieStrArr.forEach(cookieStr => {
        const arr = cookieStr.split("=");
        cookies[arr[0]] = arr[1];
    });
    return cookies;
}