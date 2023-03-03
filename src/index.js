import { getTodos, saveTodos } from './modules/storage.js';

const todoInput = document.querySelector('#new-todo');
const addTodoBtn = document.querySelector('#add-todo');
const clearCheckedBtn = document.querySelector('#clear-checked');
const todosList = document.querySelector('#todos');

let todos = getTodos();

function renderTodos() {
  todosList.innerHTML = '';
  todos.forEach((todo, index) => {
    todo.index = index;
    todosList.appendChild(createTodoElement(todo));
  });
}

function createTodoElement(todo) {
  const todoElement = document.createElement('li');
  todoElement.classList.add('list_item');
  todoElement.innerHTML = `
    <div class='list_con'>
      <input type="checkbox" ${todo.completed ? 'checked' : ''}>
      <span class='p' contenteditable="true" class="${todo.completed ? 'completed' : ''}">${todo.task}</span>    
    </div>
    <div>
      <button class="btns edit-todo"><i class="fa-solid fa-ellipsis-vertical"></i></button>
      <button class="btns remove-todo" style="display: none;"><i class="fa-solid fa-trash-can"></i></button>
      <button class="btns save-todo" style="display: none;">Save</button>
    </div>   
  `;
  const todoTextElement = todoElement.querySelector('span');
  const editTodoButton = todoElement.querySelector('.edit-todo');
  const removeTodoButton = todoElement.querySelector('.remove-todo');
  const saveTodoButton = todoElement.querySelector('.save-todo');
  todoTextElement.addEventListener('keydown', (event) => {
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
    editTodoButton.style.display = 'none';
    removeTodoButton.style.display = 'inline-block';
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

addTodoBtn.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task) {
    todos.push({ task, completed: false, index: todos.length });
    saveTodos(todos);
    todoInput.value = '';
    renderTodos();
  }
});
clearCheckedBtn.addEventListener('click', () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos(todos);
  todos.forEach((todo, index) => {
    todo.index = index;
  });
  renderTodos();
});

renderTodos();
