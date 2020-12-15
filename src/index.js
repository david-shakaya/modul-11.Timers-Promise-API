import '../src/styles.css'

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


const refs = {
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  clockface: document.querySelector('.js-clockface'),
};


refs.startBtn.addEventListener('click', startTimer)
refs.stopBtn.addEventListener('click', stopTimer)

function startTimer() {
    timer.start()
}
function stopTimer() {
    timer.stop()
    refs.clockface.textContent = '00:00:00'
}

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
        if (this.intrvalId) {
            this.isActive = false  //При нажатии на стоп меняем на фолс
            clearInterval(this.intrvalId)
        }
    },
}
/*
   * - Принимает время в миллисекундах
   * - Высчитывает сколько в них вмещается часов/минут/секунд
   * - Возвращает обьект со свойствами hours, mins, secs
   * - Адская копипаста со стека 💩
   */
  function getTimeComponents(time) {
    const hours = pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return (`${hours}:${mins}:${secs}`)
  }
/*
   * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
   */
function pad(value) {
    return String(value).padStart('2',0)
}
