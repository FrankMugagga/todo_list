import './style.css';

const list = [
  {
    description: 'task1',
    completed: true,
    index: 1,
  },
  {
    description: 'task3',
    completed: false,
    index: 3,
  },
  {
    description: 'task2',
    completed: true,
    index: 2,
  },
];

list.sort((a, b) => a.index - b.index);

const listCont = document.getElementById('list');
const populate = () => {
  for (let i = 0; i < list.length; i += 1) {
    const checkcompleted = list[i].completed ? 'checked' : '';
    const li = document.createElement('li');
    li.classList.add('list_item');
    li.innerHTML = `
      <div class="list_con">
        <input type="checkbox" ${checkcompleted}>
        <p>${list[i].description}</p>
      </div>
                  
      <button class="listBtn"><i class="fa-solid fa-ellipsis-vertical"></i></button>
    
    `;
    listCont.appendChild(li);
  }
};

populate();