import displayList from './display.js';
import { toLocalStorage } from './storage.js';

export const inputValue = (e) => {
    e.preventDefault();
  
    if (toAdd.value) {
      toLocalStorage(toAdd.value);
      displayList();
    }
  
    form.reset();
  };
  
  export  const clearSelectOnly = () => {
    let list = JSON.parse(localStorage.getItem('list')) || [];
    list = list.filter((item) => !item.completed);
    localStorage.setItem('list', JSON.stringify(list));
  
    for (let i = 0; i < list.length; i += 1) {
      const list = JSON.parse(localStorage.getItem('list')) || [];
      list[i].index = i + 1;
      localStorage.setItem('list', JSON.stringify(list));
    }
  
    displayList();
  }; 