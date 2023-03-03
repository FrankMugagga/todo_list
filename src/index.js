import { getTodos, saveTodos, clearTodos } from './modules/storage.js';

const todoInput = document.querySelector('#new-todo');
const addTodoBtn = document.querySelector('#add-todo');
const clearCheckedBtn = document.querySelector('#clear-checked');
/*
const clearCompletedBtn = document.querySelector('#clear-completed');
const clearAllBtn = document.querySelector('#clear-all');*/
const todosList = document.querySelector('#todos');

let todos = getTodos();

function createTodoElement(todo) {
  const todoElement = document.createElement('li');
  todoElement.classList.add('list_item');
    todoElement.innerHTML = `
    <div class='list_con'>
      <input type="checkbox" ${todo.completed ? 'checked' : ''}>
      <span class='p' contenteditable="true" class="${todo.completed ? 'completed' : ''}">${todo.task}</span>    
    </div>
    <div>
      <button class="edit-todo"><i class="fa-solid fa-ellipsis-vertical"></i></button>
      <button class="remove-todo"><i class="fa-solid fa-trash-can"></i></button>
      <button class="save-todo" style="display: none;">Save</button>
    </div>   
  `;
  const editBtn = todoElement.querySelector('fa-ellipsis-vertical');
  const todoTextElement = todoElement.querySelector('span');
  const editTodoButton = todoElement.querySelector('.edit-todo');
  const saveTodoButton = todoElement.querySelector('.save-todo');
  /*todoTextElement.addEventListener('input', () => {
    saveTodoButton.style.display = 'inline-block';
  });*/
  todoTextElement.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveTodoButton.click();
    }
  });
  saveTodoButton.addEventListener('click', () => {
    todo.task = todoTextElement.textContent.trim();
    saveTodos(todos);
    saveTodoButton.style.display = 'none';
  });
  todoElement.querySelector('input').addEventListener('change', () => {
    todo.completed = !todo.completed;
    saveTodos(todos);
    if (todo.completed) {
      todoTextElement.classList.add('completed');
    } else {
      todoTextElement.classList.remove('completed');
    }
  });
  editTodoButton.addEventListener('click', () => {
    todoTextElement.contentEditable = true;
    todoTextElement.focus();
    todoElement.style.background = 'lightyellow';
    editBtn.style.display = 'none';
    //saveTodoButton.style.display = 'inline-block';
  });
  todoElement.querySelector('button.remove-todo').addEventListener('click', () => {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    saveTodos(todos);
    todos.forEach((todo, index) => {
      todo.index = index;
    });
    renderTodos();
  });
  return todoElement;
}

function renderTodos() {
  todosList.innerHTML = '';
  todos.forEach((todo, index) => {
    todo.index = index;
    todosList.appendChild(createTodoElement(todo));
  });
}

addTodoBtn.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task) {
    todos.push({ task, completed: false, index: todos.length });
    saveTodos(todos);
    todoInput.value = '';
    renderTodos();
  }
});
/*
clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos(todos);
  todos.forEach((todo, index) => {
    todo.index = index;
  });
  renderTodos();
});*/

clearCheckedBtn.addEventListener('click', () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos(todos);
  todos.forEach((todo, index) => {
    todo.index = index;
  });
  renderTodos();
});
/*
clearAllBtn.addEventListener('click', () => {
  clearTodos();
  todos = [];
  renderTodos();
});*/

renderTodos();
