import { toLocalStorage } from './modules/storage.js';
import displayList from './modules/display.js';
import './style.css';

const form = document.getElementById('list_form');
const toAdd = document.getElementById('toAdd');
const clearSelected = document.getElementById('clear_selected');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (toAdd.value) {
    toLocalStorage(toAdd.value);
    displayList();
  }

  form.reset();
});

clearSelected.addEventListener('click', () => {
  let list = JSON.parse(localStorage.getItem('list')) || [];
  list = list.filter((item) => !item.completed);
  localStorage.setItem('list', JSON.stringify(list));

  for (let i = 0; i < list.length; i += 1) {
    const list = JSON.parse(localStorage.getItem('list')) || [];
    list[i].index = i + 1;
    localStorage.setItem('list', JSON.stringify(list));
  }

  displayList();
});

displayList();
