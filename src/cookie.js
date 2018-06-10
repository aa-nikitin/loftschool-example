/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// формируем объект cookie
let objCoockie = document.cookie.split('; ').reduce((prev, current) => {
  let [name, value] = current.split('=');
  if (name || value) {
    prev[name] = value;
  }
  return prev;
}, {});

console.log(objCoockie);

function addRow(key, val) {
  let row = document.createElement('tr');
  let name = document.createElement('td');
  let value = document.createElement('td');
  let del = document.createElement('td');
  let button = document.createElement('button');

  value.id = `id-${key}`;
  name.textContent = key;
  value.textContent = val;
  button.textContent = 'Удалить';
  del.appendChild(button);

  button.addEventListener('click', () => {
    document.cookie = name.textContent + `=;expires=${new Date().toUTCString()};`
    row.remove();
    delete objCoockie[key];
    
  });

  row.appendChild(name);
  row.appendChild(value);
  row.appendChild(del);

  listTable.appendChild(row);
}

function changeRow(key, val) {
  let value = listTable.querySelector(`#id-${key}`);

  value.textContent = val;
}

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    /*if (isMatching(i, array[i], field) && i){
      watchRow(i);
    }*/
    let field = filterNameInput.value;
    listTable.textContent = '';
    for (let i in objCoockie) {
        if (isMatching(i, field) || isMatching(objCoockie[i], field)){
          addRow(i, objCoockie[i]);
        } 
    }
    console.log(listTable.children.length);
});

addButton.addEventListener('click', () => {
    let value = listTable.querySelector(`#id-${addNameInput.value}`);
    let field = filterNameInput.value;
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    if (!value) {
      //addRow(addNameInput.value, addValueInput.value);
      if (isMatching(addNameInput.value, field) || isMatching(addValueInput.value, field)){
        addRow(addNameInput.value, addValueInput.value);
      } 
    } else {
      changeRow(addNameInput.value, addValueInput.value);  
    }

    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    objCoockie[addNameInput.value] = addValueInput.value;  

    
    
    console.log(listTable.children.length);
});

function isMatching(full, chunk) {
  full = full.toLowerCase();
  chunk = chunk.toLowerCase();
  
  return full.indexOf(chunk) >=0 ? true : false;
}
let field = filterNameInput.value;
for (let i in objCoockie) {
  if (isMatching(i, field) || isMatching(objCoockie[i], field)){
    addRow(i, objCoockie[i]);
  } 
}
console.log(listTable.children.length);

/*function delRow() {
  console.log('asd');
}*/
