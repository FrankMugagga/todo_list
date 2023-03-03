const STORAGE_KEY = 'todos';

export function getTodos() {
  const todosJSON = localStorage.getItem(STORAGE_KEY);
  return todosJSON ? JSON.parse(todosJSON) : [];
}

export function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function clearTodos() {
  localStorage.removeItem(STORAGE_KEY);
}
