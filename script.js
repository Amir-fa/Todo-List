const todoList = document.querySelector('.todo-list');
const todoButton = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const filterOption = document.querySelector('.todo-filter');

document.addEventListener('DOMContentLoaded', getLocalTodos);
todoButton.addEventListener('click', todoAdd);
todoList.addEventListener('click', checkDelete);
filterOption.addEventListener('click', todoFilter);

function todoAdd(event) {
  event.preventDefault();

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo-div');

  const newTodo = document.createElement('li');
  newTodo.classList.add('new-todo');
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  const checkButton = document.createElement('button');
  checkButton.classList.add('check-btn');
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(checkButton);

  const trashButton = document.createElement('button');
  trashButton.classList.add('trash-btn');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);

  todoInput.value = '';
}

function checkDelete(event) {
  const item = event.target;
  const todo = item.parentElement;

  if (item.classList[0] === 'trash-btn') {
    todo.classList.add('fall');
    deleteLocalTodos(todo);
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }

  if (item.classList[0] === 'check-btn') {
    todo.classList.toggle('completed');
  }
}

function todoFilter(event) {
  const todos = todoList.childNodes;

  todos.forEach((todo) => {
    switch (event.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-div');

    const newTodo = document.createElement('li');
    newTodo.classList.add('new-todo');
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    const checkButton = document.createElement('button');
    checkButton.classList.add('check-btn');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(checkButton);

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function deleteLocalTodos(todo) {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoIndex = todo.classList[0].innerText;
  todos.splice(todos.indexOf(todoIndex));

  localStorage.setItem('todos', JSON.stringify(todos));
}
