import { fromLocalStorage } from './storage.js';

const listCont = document.getElementById('list');

export default function displayList() {
  const list = fromLocalStorage();
  listCont.innerHTML = '';
  list.forEach((item, listIndex) => {
    const li = document.createElement('li');
    li.dataset.index = item.index;
    li.classList.add('list_item');

    const checkLabel = document.createElement('div');
    checkLabel.classList.add('list_con');
    li.appendChild(checkLabel);

    const checkBoxElement = document.createElement('input');
    checkBoxElement.type = 'checkbox';
    checkBoxElement.checked = item.completed;
    checkBoxElement.dataset.description = item.description;
    checkBoxElement.dataset.index = item.index;
    checkLabel.appendChild(checkBoxElement);

    const labelElement = document.createElement('div');
    labelElement.classList.add('label');
    labelElement.textContent = item.description;
    labelElement.dataset.index = item.index;
    labelElement.contentEditable = false;
    checkLabel.appendChild(labelElement);

    window.addEventListener('DOMContentLoaded', () => {
      if (checkBoxElement.checked) {
        list[listIndex].completed = true;
        localStorage.setItem('list', JSON.stringify(list));
        labelElement.style.textDecoration = 'line-through';
        labelElement.style.color = 'red';
      } else {
        list[listIndex].completed = false;
        localStorage.setItem('list', JSON.stringify(list));
        labelElement.style.color = 'green';
        labelElement.style.textDecoration = 'none';
      }
    });

    const buttonCont = document.createElement('div');
    buttonCont.classList.add('button_cont');
    li.appendChild(buttonCont);

    const editButton = document.createElement('button');
    editButton.classList.add('edit_btn');
    editButton.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
    editButton.dataset.index = item.index;
    buttonCont.appendChild(editButton);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove_btn');
    removeButton.dataset.index = item.index;
    removeButton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
    buttonCont.appendChild(removeButton);

    checkBoxElement.addEventListener('change', () => {
      if (checkBoxElement.checked) {
        list[listIndex].completed = true;
        localStorage.setItem('list', JSON.stringify(list));
        labelElement.style.textDecoration = 'line-through';
        labelElement.style.color = 'red';
      } else {
        list[listIndex].completed = false;
        localStorage.setItem('list', JSON.stringify(list));
        labelElement.style.color = 'green';
        labelElement.style.textDecoration = 'none';
      }
    });

    editButton.addEventListener('click', () => {
      li.style.background = 'yellow';
      removeButton.style.display = 'block';
      editButton.style.display = 'none';

      document.addEventListener('click', (e) => {
        const isClickInside = removeButton.contains(e.target) || editButton.contains(e.target);
        if (!isClickInside) {
          removeButton.style.display = 'none';
          editButton.style.display = 'block';
        }
      });

      labelElement.contentEditable = true;
      labelElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          list[listIndex].description = labelElement.textContent;
          localStorage.setItem('list', JSON.stringify(list));
        }
      });

      document.addEventListener('click', (e) => {
        const isClickInside = li.contains(e.target) || labelElement.contains(e.target);
        if (!isClickInside) {
          labelElement.contentEditable = false;
          li.style.background = 'none';
        }
      });
    });

    removeButton.addEventListener('click', () => {
      list.splice(listIndex, 1);
      localStorage.setItem('list', JSON.stringify(list));

      for (let i = 0; i < list.length; i += 1) {
        list[i].index = i + 1;
        localStorage.setItem('list', JSON.stringify(list));
      }

      listCont.removeChild(li);
    });

    listCont.appendChild(li);
  });
}