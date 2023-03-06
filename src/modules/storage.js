export function toLocalStorage(toAdd) {
  const list = JSON.parse(localStorage.getItem('list')) || [];
  const listObject = {
    description: toAdd,
    completed: false,
    index: list.length + 1,
  };

  list.push(listObject);
  localStorage.setItem('list', JSON.stringify(list));
  localStorage.removeItem('todoList');

  return list;
}

export function fromLocalStorage() {
  const list = JSON.parse(localStorage.getItem('list')) || [];

  return list.map((list, listIndex) => ({
    description: list.description,
    completed: list.completed,
    index: listIndex + 1,
  }));
}
