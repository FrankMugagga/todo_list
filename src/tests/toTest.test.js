const { toLocalStorage, removeFunc } = require('./toTest.js');

describe('Adding an item', () => {
  afterEach(() => {
    localStorage.clear();
  });
  test('single item', () => {
    toLocalStorage('milk');

    document.body.innerHTML += `
    <ul id="listed">  <ul>`;
    const list = JSON.parse(localStorage.getItem('list'));
    const listed = document.getElementById('listed');
    let items = '';
    list.forEach((item) => {
      items += `
        <li>${item.description}</li>
        `;
    });
    listed.innerHTML = items;

    expect(listed.children.length).toBe(1);
    expect(list).toEqual([{ description: 'milk', completed: false, index: 1 }]);
    expect(list[0].index).toBe(1);
  });
});

describe('Removing an item', () => {
  test('removes the correct item from the list and updates indexes', () => {
    const list = [
      { description: 'item 1', completed: false, index: 1 },
      { description: 'item 2', completed: false, index: 2 },
      { description: 'item 3', completed: false, index: 3 },
    ];
    localStorage.setItem('list', JSON.stringify(list));

    removeFunc(1);

    const expectedList = [
      { description: 'item 1', completed: false, index: 1 },
      { description: 'item 3', completed: false, index: 2 },
    ];
    expect(JSON.parse(localStorage.getItem('list'))).toEqual(expectedList);
  });
});
