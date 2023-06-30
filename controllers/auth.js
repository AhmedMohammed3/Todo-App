const User = require('../models/User');
exports.getLogin = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }
    return res.render('login', { title: "Login Page" });
}

exports.loginUser = async(req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }
    let error;
    const { email, password } = req.body;
    if (!email || email.trim() == '' || !password || password.trim() == '') {
        error = "Empty Fields";
    } else {
        const user = await User.findOne({ email, password });
        if (user) {
            res.cookie('userId', user.id);
            return res.redirect('/');
        }
        error = "Wrong Email or Password";
    }
    return res.render('login', { title: "Login Page", error });
}

exports.getSignUp = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('signup', { title: "Sign Up Page" });
}

exports.addUser = async(req, res, next) => {
    try {
        if (!req.user) {
            const { name, email, password } = req.body;
            if (!name || name.trim() == '' || !email || email.trim() == '' || !password || password.trim() == '') {
                throw new Error("Empty Fields");
            }
            const duplicateUser = await User.findOne({ email });
            if (duplicateUser) {
                throw new Error("Email already exist");
            }
            const newUser = new User({ name, email, password })
            const user = await newUser.save();
            if (!user) {
                throw new Error("Error Adding User");
            }
        }
        return res.redirect('/');
    } catch (err) {
        return res.render('signup', { title: "SignUp Page", error: err.message });
    }
}