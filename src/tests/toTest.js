//const list = JSON.parse(localStorage.getItem('list')) || [];
function toLocalStorage(toAdd) {
  const list = JSON.parse(localStorage.getItem('list')) || [];
    const listObject = {
      description: toAdd,
      completed: false,
      index: list.length + 1,
    };
  
    list.push(listObject);
    localStorage.setItem('list', JSON.stringify(list));
     
    return list;
  }



 
/*function removeFunc(listIndex) {
  const list = JSON.parse(localStorage.getItem('list'));
    list.splice(listIndex, 1);
    localStorage.setItem('list', JSON.stringify(list));

    for (let i = 0; i < list.length; i += 1) {
      list[i].index = i + 1;
      localStorage.setItem('list', JSON.stringify(list));
    }

    //listCont.removeChild(li);
  };*/

  function removeFunc(listIndex) {
    const list = JSON.parse(localStorage.getItem('list')) || [];
    if (list.length > listIndex) {
      list.splice(listIndex, 1);
      localStorage.setItem('list', JSON.stringify(list));
  
      for (let i = 0; i < list.length; i += 1) {
        list[i].index = i + 1;
        localStorage.setItem('list', JSON.stringify(list));
      }
    }
  };
  
  
  module.exports ={ toLocalStorage, removeFunc } ;


 