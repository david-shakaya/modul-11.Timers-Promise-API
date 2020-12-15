import '../src/styles.css'
import menuListItems from './menu.json'
import menuItems from '../templates/menu-items.hbs'

// Дом узлы
const ulMenuRef = document.querySelector('.js-menu');
const inputThemeSwitchRef = document.querySelector('.theme-switch__toggle');
const bodyRef = document.querySelector('body');

// Добавление разметки
const markup = menuItems(menuListItems)
ulMenuRef.insertAdjacentHTML('beforeend', markup)

// Cлушатели
inputThemeSwitchRef.addEventListener('change', changeTheme)

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

//Возможно, есть лушее решение через Шаблонизатор-Усы
const tagListItem = document.querySelectorAll('.tag-list__item');
tagListItem.forEach(el => {
    if (el.textContent === '') {
        el.remove()
    }
})


function changeTheme(e) {
    if (e.target.checked) {
     
        // запысываем в локал.хран тема черная
        localStorage.setItem('Theme', JSON.stringify(Theme.DARK));
        const getItemTheme = localStorage.getItem('Theme')
        console.log(getItemTheme);

        if (getItemTheme) {
            bodyRef.classList.add('dark-theme')
        }
        }
    else {
        localStorage.removeItem('Theme');
        bodyRef.classList.remove('dark-theme')
    }
    
}
if (localStorage.getItem('Theme')) {
    bodyRef.classList.add('dark-theme')
    inputThemeSwitchRef.checked = true
}
