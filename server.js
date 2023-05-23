const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { curUser } = require('./temp/tmpData');

const todoRoutes = require('./routes/todo');

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

app.use(todoRoutes);
// 404 page
app.use((req, res) => {
    return res.status(404).render('404', { title: '404', user: curUser });
});