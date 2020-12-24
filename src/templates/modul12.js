
import articlesTempl from '../templates/articles.hbs'


// Таким образом ищем чтото на  бекенде (ПУБЛИЧНОМ API)
// Метод может быть и не json() - все зависит от того акие файлы с бекенда к нам приходят



// fetch('https://jsonplaceholder.typicode.com/todos/') //Ссылка на бекенд API
//   .then(response => response.json())
//   .then(json => console.log(json))

// еще одну библиотеку API используем
//  ищем  price и тег story
// fetch('http://hn.algolia.com/api/v1/search_by_date?query=price&tags=story')
//     .then(res => res.json())
//     .then(data => console.log(data))


/* >>>>>>>>>>>>>>>>>
 */
const refs ={
    articlesContainer: document.querySelector('.articles-js'),
    searchForm: document.querySelector('.search-form-js'),

}


    //  Публичный API (Бекенд) - на котором требуется авторизация
    // Как работать с этим API можно найти в документации
// fetch('http://newsapi.org/v2/top-headlines?country=ua&q=19&apiKey=9612ce51c4354d579a8c97e2de8f4083')
//     .then(res => res.json())
//     .then(data => console.log(data.articles))

// >>>>>>>> ТО же самое но делаем переменные(типа красивый код)
// const url = 'http://newsapi.org/v2/top-headlines?country=ua&q='
// let findNews = ''
// const key = '&apiKey=9612ce51c4354d579a8c97e2de8f4083'
// fetch(`${url}${findNews}${key}`)  
//     .then(res => res.json())
//     .then(data => {
//         const markup = articlesTempl(data.articles)
//         refs.articlesContainer.insertAdjacentHTML('beforeend',markup)
//     })
    
    // НУЖНО КОД ПОЧИСТИТЬ КАК В ВИДЕО РЕПЕТЫ
refs.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = e.target.query.value

     refs.articlesContainer.innerHTML = ''
    const url = 'http://newsapi.org/v2/top-headlines?country=ua&q='
 let findNews = inputValue
const key = '&apiKey=9612ce51c4354d579a8c97e2de8f4083'
fetch(`${url}${findNews}${key}`)  
    .then(res => res.json())
    .then(data => {
        const markup = articlesTempl(data.articles)
        refs.articlesContainer.insertAdjacentHTML('beforeend',markup)
    })
})