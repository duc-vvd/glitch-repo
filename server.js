// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: true}));

var todos = ['Đi chợ', 'Nấu cơm', 'Rửa bát', 'Học code tại CoderX'];

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.render('index');
});

app.get('/todos', (req, res) => {
  if(!req.query.q){
    res.render('todos/index', {
      todos: todos
    });
  }
  var q = req.query.q.toLowerCase();
  var matchedTodos = todos.filter((todo) => {
    return todo.toLowerCase().indexOf(q) > -1;
  });
  res.render('todos/index', {
    todos: matchedTodos
  });
})

app.post('/todos/create', (req, res) => {
  todos.push(req.body.todo);
  res.redirect('back');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
