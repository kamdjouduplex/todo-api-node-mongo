const mongoose = require('mongoose');

// Todo Schema
const todoSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

//export our Todo model
const Todo = module.exports = mongoose.model('Todo', todoSchema);

//here we add the getTodos method and export it to our model
module.exports.getTodos = (callback, limit) => {
    Todo.find(callback).limit(limit);
}

//here we add the getTodoById method and export it to our model
module.exports.getTodoById = (id, callback) => {
    Todo.findById(id, callback);
}


//here we add the addTodo method and export it to our model
module.exports.addTodo = (todo, callback) => {
    Todo.create(todo, callback);
}

//here we add the updateTodo method and export it to our model
module.exports.updateTodo = (id, todo, callback) => {
    let query = {_id: id};
    let update = {
        title: todo.title,
        description: todo.description
    };
    Todo.findOneAndUpdate(query, update, callback);
}


//here we add the deleteTodo method and export it to our model
module.exports.deleteTodo = (id, callback) => {
    let query = {_id: id};
    Todo.remove(query, callback);
}