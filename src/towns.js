/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
      xhr.responseType = 'json';
      xhr.send();
      xhr.onload = () => {
          if (xhr.status >= 400) {
              reject('Что то пошло не так');
          } else {
              const city = xhr.response;
              city.sort((a, b) => a.name > b.name ? 1 : -1 );
              resolve(city);
          }
      };  
  }); 
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  full = full.toLowerCase();
  chunk = chunk.toLowerCase();
  
  return full.indexOf(chunk) >=0 ? true : false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
/* Кнопка с перезагрузкой */
const repeatButton = homeworkContainer.querySelector('#button-repeat');

let towns = [];

function reload() {
    loadTowns()
        .then(city => {
            towns = city;
            filterBlock.style.display = 'block';
            loadingBlock.style.display = 'none';
            repeatButton.style.display = 'none';
        },
        error => {
            loadingBlock.textContent = `${error}`;
            repeatButton.style.display = 'block';
            repeatButton.onclick = () => reload();
            loadingBlock.parentElement.appendChild(repeatButton);
        });
}

reload();



filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    filterResult.innerHTML = '';
    let field = filterInput.value;

    for (let town of towns) {
      if (isMatching(town.name, field)){
        const div = document.createElement('div');

        div.innerHTML = town.name;
        if (field) {
          filterResult.appendChild(div);
        }
      }   
    }
});

export {
    loadTowns,
    isMatching
};
