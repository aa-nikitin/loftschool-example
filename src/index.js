/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */

function forEach(array, fn) {
    for (let i in array) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArray = [];
    //вариант 1
    /*for (let i = 0; i < array.length; i++) {
        newArray.push(fn(array[i], i, array));
    }*/

    //вариант 2
    for (let i in array) {
        newArray = [...newArray, fn(array[i], i, array)];
    }
    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let accum, i;

    initial ? accum = initial : accum = array[0];
    initial ? i = 0 : i = 1;

    for (i; i < array.length; i++) {
        accum = fn(accum, array[i], i, array)
    }
    
    return accum;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    //вариант 1
    /*let arr = [];
    
    for (let item in obj) {
        arr.push(item.toUpperCase());   
    }

    return arr;*/

    //вариант 2
    let arr = Object.keys(obj);

    return arr.map(function(item) {
        return item.toUpperCase();
    });
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    
    let len = array.length,
        newArr = [];

    from < 0 ? from += len : from;
    !from || len + from < 0 ? from = 0 : from;

    to === 0 ? to = "undifined" : to;
    to < 0 ? to += len : to;
    !to || len < to ? to = len : to;
    
    for (let i = from; i < to; i++) {
        newArr.push(array[i]);
    }
    
    return newArr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
          target[prop] = value * value;
          return true;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};