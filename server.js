const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { getCurUser, parseCookies } = require('./helpers/functions');

const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');

const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = require('./config/config');

// express app
const app = express();

//connect to mongodb
const dbUri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbUri)
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Connected and Listening for ${PORT}`)
        })
    })
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async(req, res, next) => {
    const cookies = parseCookies(req);
    if (cookies && cookies.userId) {
        const user = await getCurUser(cookies.userId);
        req.user = user;
    }
    next();
})

app.use(todoRoutes);
app.use(authRoutes);
// 404 page
app.use(async(req, res) => {
    return res.status(404).render('404', { title: 'Not Found', user: req.user });
});