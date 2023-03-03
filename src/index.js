import { getTodos, saveTodos, clearTodos } from './modules/storage.js';

const todoInput = document.querySelector('#new-todo');
const addTodoBtn = document.querySelector('#add-todo');
const clearCompletedBtn = document.querySelector('#clear-completed');
const clearCheckedBtn = document.querySelector('#clear-checked');
const clearAllBtn = document.querySelector('#clear-all');
const todosList = document.querySelector('#todos');

let todos = getTodos();

function createTodoElement(todo) {
  const todoElement = document.createElement('li');
  todoElement.innerHTML = `
    <input type="checkbox" ${todo.completed ? 'checked' : ''}>
    <span contenteditable="true" class="${todo.completed ? 'completed' : ''}">${todo.task}</span>
    <button class="edit-todo">Edit</button>
    <button class="remove-todo">Remove</button>
    <button class="save-todo" style="display: none;">Save</button>
  `;
  const todoTextElement = todoElement.querySelector('span');
  const editTodoButton = todoElement.querySelector('.edit-todo');
  const saveTodoButton = todoElement.querySelector('.save-todo');
  todoTextElement.addEventListener('input', () => {
    saveTodoButton.style.display = 'inline-block';
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
    saveTodoButton.style.display = 'inline-block';
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

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos(todos);
  todos.forEach((todo, index) => {
    todo.index = index;
  });
  renderTodos();
});

clearCheckedBtn.addEventListener('click', () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos(todos);
  todos.forEach((todo, index) => {
    todo.index = index;
  });
  renderTodos();
});

clearAllBtn.addEventListener('click', () => {
  clearTodos();
  todos = [];
  renderTodos();
});

renderTodos();
