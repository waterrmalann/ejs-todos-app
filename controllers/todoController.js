import Todo from '../models/Todo.js';

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ createdBy: req.session.user._id });
        res.status(200).render('todos', { todos, name: req.session.user.name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const postTodos = async (req, res) => {
    const { content } = req.body;

    if (!content || content.length < 2) {
        return res.status(400).json({ error: "no content provided" });
    }

    try {
        const newTodo = await Todo.create({ createdBy: req.session.user._id, content });
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const putTodos = async (req, res) => {
    const { id } = req.params;
    const { content, completed } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { content, completed }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteTodos = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export { getTodos, postTodos, putTodos, deleteTodos };