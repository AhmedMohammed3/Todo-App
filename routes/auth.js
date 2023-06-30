const express = require('express');
const router = express.Router();
const { getLogin, loginUser, getSignUp, addUser } = require('../controllers/auth');

router.get('/login', getLogin);
router.post('/login', loginUser);
router.get('/signup', getSignUp);
router.post('/signup', addUser);
module.exports = router;