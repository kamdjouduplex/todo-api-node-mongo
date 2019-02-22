const express = require('express');
const app = express();

const cors = require('cors');
let bodyParser = require('body-parser');
const mongoose = require('mongoose');

//configure the app to use cors
app.use(cors());

// configure the app to use bodyParser()
app.use(bodyParser.json());

// injecting our Todo
Todo = require('./models/todo');

// connect to our mongo db
mongoose.connect('mongodb://localhost/tododb');
const  db = mongoose.connection;


//then we create our first route
app.get('/', function(req, res){
    res.send('Hello World!');
});


//route to handle the get todos list
app.get('/api/todos', (req, res) => {
    Todo.getTodos(
        (error, todos) => {
            if(error){
                throw error;
            }
            res.json(todos);
        }
    );
});

//route to handle the get a single todo
app.get('/api/todos/:_id', (req, res) => {
    Todo.getTodoById( req.params._id,
        (error, todo) => {
            if(error){
                throw error;
            }
            res.json(todo);
        }
    );
});

//route to handle the add todo
app.post('/api/todos', (req, res) => {
    let todo = req.body;
    Todo.addTodo( todo,
        (error, todo) => {
            if(error){
                throw error;
            }
            res.json(todo);
        }
    );
});

//route to handle the edit todo
app.put('/api/todos/:_id', (req, res) => {
    const id = req.params._id;
    const todo = req.body;
    Todo.updateTodo(id, todo, 
        (error, todo) => {
            if(error){
                throw error;
            }
            res.json(todo);
        }
    );
});

//route to handle the delete todo
app.delete('/api/todos/:_id', (req, res) => {
    const id = req.params._id;
    Todo.deleteTodo( id,
        (error, todo) => {
            if(error){
                throw error;
            }
            res.json(todo);
        }
    );
});

app.listen(3000);
console.log('sever running on port 3000');