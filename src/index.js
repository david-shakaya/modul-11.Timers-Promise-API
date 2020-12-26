

import '../src/styles.css'
// import './templates/modul12'
import './templates/modul-12.part-2'

/* 
* Метод setInterval()
*
* - Первым параметром передает название функц. вторым время через которое функц исполниться.
* - Третим, четверт, и тд. обычные параметры функц. 
*/

// const logger = time => (console.log(`Лог каждые ${time} - ${Date.now()}`))
// setInterval(logger, 1000, 1000);


// Таже функц что и выше но без стрелок
// function logger(time) {
//     console.log(`Лог каждые ${time}ms. - ${Date.now()}`)
// }
// const intervalId = setInterval(logger, 1000, 1000);


/* 
* - Удаляем интервал clearInterval(intervalId)
*/

/* 
* > >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Задача
*
*
*  Имитируем вызов модалки. Модалка появляеться 3 раза. Если пользователь подписался 
*  ставим hasSubscribed = true. Больше не показываем модалку
 */
// let subscriptionCounter = 0;
// let hasSubscribed = false;

// const intervalShowLogger = setInterval(showLogger, 1000)

// function showLogger() {
//     subscriptionCounter += 1; //Во время каждого вызова приплюсовуем +1
//     // hasSubscribed = true;   // Може изменить на тру или фолс
//     console.log('Визываем функц 3 раза');

//     // если вызвали три раза или hasSubscribed изминилась на тру удаляем сет интервал
//     if (subscriptionCounter === 3 || hasSubscribed === true) {
//         clearInterval(intervalShowLogger)
//         console.log('Вызвали 3 раза, или hasSubscribed === true.  останавливаем ');
//     }
// }


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   НОТИФИКАШКА
/**
 * - Показываем и скрываем добавляя/удаляя класс is-visible
 * - Скрываем через определённое время
 * - Скрываем при клике
 * - Не забываем чистить таймер
 */

// const NOTIFICATION_DELAY = 3000;
// let timeoutId = null;
// const refs = {
//   notification: document.querySelector('.js-alert'),
// };

// refs.notification.addEventListener('click', onNotificationClick);

// showNotification();

// /*
//  * Функции
//  */
// function onNotificationClick() {
//   hideNotification();
//   clearTimeout(timeoutId);
// }

// function showNotification() {
//   refs.notification.classList.add('is-visible');

//   timeoutId = setTimeout(() => {
//     console.log('Закрываем алерт автоматически чтобы не висел');
//     hideNotification();
//   }, NOTIFICATION_DELAY);
// }

// function hideNotification() {
//   refs.notification.classList.remove('is-visible');
// }


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   ТАймекр

// Ссылки на ДОМ-елементы
const refs = {
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  clockface: document.querySelector('.js-clockface'),
};

// Добавляем обьект с методами
const timer = { 
    intrvalId: null,
    isActive: false,

    start() {
        if (this.isActive) {  // если тру тогда кнопку нажать повторно невозможно
            return
        }
 
        this.isActive =true  // При первом нажатии добавл тру
        const startTime = Date.now()  
       this.intrvalId = setInterval(() => {
            const curentTime = Date.now()
           const deltaTime = curentTime - startTime
        refs.clockface.textContent = getTimeComponents(deltaTime) 
        
       },1000)

    },
    stop() {
        if (this.intrvalId) {    //если intrvalId ===true то выполни
            this.isActive = false  //При нажатии на стоп меняем на фолс
            clearInterval(this.intrvalId)  //Удаляет интервал
             refs.clockface.textContent = '00:00:00'  //При нажатии на стоп обнули текст p
        }
    },
}

// Добавляем слушатель ПОСЛЕ ОБЬЕКТА С МЕТОДАМИ
  //  >>>   bind() - служит для привязки контекстата. Ево используют если наши функц. внутри ОБЬЕКТА
refs.startBtn.addEventListener('click', timer.start.bind(timer))
refs.stopBtn.addEventListener('click', timer.stop.bind(timer))

/*
   * - Принимает время в миллисекундах
   * - Высчитывает сколько в них вмещается часов/минут/секунд
   * - Возвращает обьект со свойствами hours, mins, secs
   */
  function getTimeComponents(time) {
    const hours = pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return (`${hours}:${mins}:${secs}`)
}
  
 /* padStart()
  * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
   */
function pad(value) {
    return String(value).padStart('2',0)
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
   // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
       // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
              // ПРОМИСЫ - это патерн упрощающий работу с асинхронными операциями
              // Это обьект который представляет текущее состояние выполнения асинхронной операц

  // Прмис принимает 2 параметра:
  // resolve - если операция успешна
  // reject -есл ошибка

const promise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5;

  setTimeout(() => {
    if (success) {
      resolve('Успех')
    }

    reject('Ошибка')
  }, 1000);
})   
// console.log(promise);

//promise.then(1 параметр,...) - Когда этот промис выполниться успешно, то верни значение этого промиса "Успех"
//promise.then(...,2 параметр) - Когда этот промис выполниться с ошибкой, то верни значение этого промиса "Оибка"

// Но мы передаем только успех в then 
// в catch ошибку

let data;

promise.then((result) => {
  data = result
  console.log(data)
})
.catch((error) => console.log(error))



// ВАЖНО!!!     для получения каких то данных при успешном выполнении операц. Записываем внутрь колбекак как с DATA выше



/*
 * Цепочки промисов (chaining)
 * Promise.prototype.catch(error)
 * Promise.prototype.finally()
//  */

// function onFulfilled(result) {
//   console.log('onFulfilled -> onFulfilled');
//   console.log(`✅ ${result}`);
// }

// promise
//   .then(onFulfilled)
//   .then(x => {
//     console.log(x);

//     return 10;
//   })
//   .then(y => {
//     console.log('y', y );
//     return y + 10
//   })
//   .catch(error => console.log(error))
//   .finally(() => console.log('Я буду выполнен в любом случае'));




  //  >>>>>>>>>>>>>>> ПРОМИСИФИКАЦИЯ ФУНКЦИй
// Как получить промис в функции

const fetchUser = (userName) => {
 return new Promise((resolve, reject) => {
    setTimeout(() => {
      const succes = Math.random() > 0.3;

      if (succes) {
        const user = { name: userName, age: 26, salary: 3500 }
        resolve(user)
      }

      const error = "ПРоизошла ошибка"
      reject(error)
  },500)
})
}
fetchUser('Mango').then(onFetchUserSucces).catch(onFetchUserError)


function onFetchUserSucces(user) {
  console.log(user);
}

function onFetchUserError(error) {
  console.log(error);
}


// //  fetch - Обращение к бекенду
// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(res => res.json())   //.json() - принимает и читает тело Response stream. Возвращает promise (обещание)
//   .then(console.log)  // если все хорошо залогирует обьекты с бекенда
//   .catch(console.log)  // Если ошибка покажет ошибку



  // >>>>>>>>>>>>>>>>> Функц для обработки данных с бекенда

// const getUser = (id) => {
// return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`) 
// .then(res => res.json())
// }

// getUser(21).then(console.log).catch(console.log)  // Возвращает юзера по ID



// >>>>>>>>>>>>>>>>>>>>>> Задачка иподром

const horses = [
  'Secretariat',
  'Eclipse',
  'West Australian',
  'Flying Fox',
  'Seabiscuit',
];


const getRandomTime =(min, max) =>{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const run = (horse) => {
 return new Promise((resolve) =>{
    const time = getRandomTime(500, 3500)

    setTimeout(() =>{

      resolve({horse, time})
    },time)
  })
}




// run(horses[0]).then(console.log)
const promises = horses.map(horse => run(horse))
Promise.all(promises)
  .then(result => {
  console.log(result);
})
  .catch(error => console.log(error))

// //  HW -1
// const delay = (ms) => {
//  return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(ms)
//    },ms)
//  })
// };

// const logger = time => console.log(`Resolved after ${time}ms`);

// // Вызовы функции для проверки
// delay(2000).then(logger); // Resolved after 2000ms
// delay(1000).then(logger); // Resolved after 1000ms
// delay(1500).then(logger); // Resolved after 1500ms

// hw - 2

// const users = [
//   { name: 'Mango', active: true },
//   { name: 'Poly', active: false },
//   { name: 'Ajax', active: true },
//   { name: 'Lux', active: false },
// ];

// const toggleUserState = (allUsers, userName) => {
  
//   return new Promise((resolve) =>{

//     resolve(allUsers.map(user =>
//       user.name === userName ? { ...user, active: !user.active } : user,
//     ))
//   })
// }


// const logger = updatedUsers => console.table(updatedUsers);

// /*
//  * Должно работать так
//  */
// toggleUserState(users, 'Mango').then(logger);
// toggleUserState(users, 'Lux').then(logger);

// hw - 3



// const randomIntegerFromInterval = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };
// // 

// let time=0

// const makeTransaction = (transaction) => {
//   const delay = randomIntegerFromInterval(200, 500)
//   return new Promise((resolve, reject) => {
    
//     const canProcess = Math.random() > 0.3;
//     setTimeout(() => {

//     if (canProcess) {
//       resolve(transaction.id, delay);
//      time = delay
//     } 

//     reject(transaction.id);

//   }, delay);
//   })

// };


// const logSuccess = (id) => {
//   console.log(`Transaction ${id} processed in ${time}ms`);
// };

// const logError = id => {
//   console.warn(`Error processing transaction ${id}. Please try again later.`);
// };

// // ДОлжно так
// makeTransaction({ id: 70, amount: 150 })
//   .then(logSuccess)
//   .catch(logError);

// makeTransaction({ id: 71, amount: 230 })
//   .then(logSuccess)
//   .catch(logError);

// makeTransaction({ id: 72, amount: 75 })
//   .then(logSuccess)
//   .catch(logError);

// makeTransaction({ id: 73, amount: 100 })
//   .then(logSuccess)
//   .catch(logError);