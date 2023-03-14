import displayList from './modules/display.js';
import { inputValue, clearSelectOnly  } from './modules/eventListeners.js';
import './style.css';

const form = document.getElementById('list_form');
const toAdd = document.getElementById('toAdd');
const clearSelected = document.getElementById('clear_selected');

form.addEventListener('submit', inputValue);
clearSelected.addEventListener('click', clearSelectOnly);

displayList();
