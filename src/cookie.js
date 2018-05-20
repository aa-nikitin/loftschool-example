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

filterNameInput.addEventListener('keyup', function() {
    allCockie(arrCoockie);
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
});

// формируем объект cookie
let arrCoockie = document.cookie.split('; ').reduce((prev, current) => {
  let [name, value] = current.split('=');
  if (name || value) {
    prev[name] = value;
  }
  return prev;
}, {});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    watchRow(addNameInput.value, addValueInput.value);
    
});

// Добавляем строку в таблицу
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

  button.onclick = () => {
      document.cookie = name.textContent + `=;expires=${new Date().toUTCString()};`
      row.remove();
      delete arrCoockie[key];
  };

  row.appendChild(name);
  row.appendChild(value);
  row.appendChild(del);

  listTable.appendChild(row);
}

// Изменяем строку в таблице
function modifyRow(key, val) {
  let value = listTable.querySelector(`#id-${key}`);

  value.textContent = val;
}

// Добавляем строку в таблицу и coockie в объект
function watchRow(key, val) {
  
  if (val === undefined) {
    val = arrCoockie[key];
    addRow(key, val); 
  }

  if (arrCoockie[key] === undefined) {
    addRow(key, val);    
  } else {
    modifyRow(key, val); 
  }

  arrCoockie[addNameInput.value] = addValueInput.value; 
}

function allCockie(array) {
  let field = filterNameInput.value;
  listTable.textContent = '';  
  for (let i in array) {
      if (isMatching(i, array[i], field) && i){
        watchRow(i);
      } 
  }
}

function isMatching(key, name, chunk) {
  key = key.toLowerCase();
  name =name.toLowerCase();
  chunk = chunk.toLowerCase();
  let keyVal = key.indexOf(chunk) >=0 ? true : false;
  let nameVal = name.indexOf(chunk) >=0 ? true : false;
  return  (keyVal || nameVal) ? true : false;
}


allCockie(arrCoockie);




