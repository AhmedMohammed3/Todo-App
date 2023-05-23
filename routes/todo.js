const express = require('express');
const router = express.Router();
const { getIndex, createTodo, deleteTodo, updateTodo, getAllTodos } = require('../controllers/todo');

router.get('/', getIndex);
router.post('/todo/create/', createTodo);
router.delete('/todo/delete/:id', deleteTodo);
router.put('/todo/update/:id', updateTodo);
router.get('/todos', getAllTodos);
module.exports = router;