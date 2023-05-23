const User = require('../models/User');
exports.getCurUser = async() => {
    return await User.findById('646d0a7951b795af8e74b702');
};