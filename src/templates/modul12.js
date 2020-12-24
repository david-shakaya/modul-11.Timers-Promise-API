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
    //  Публичный API (Бекенд) - на котором требуется авторизация
    // Как работать с этим API можно найти в документации
// fetch('http://newsapi.org/v2/top-headlines?country=ua&q=19&apiKey=9612ce51c4354d579a8c97e2de8f4083')
//     .then(res => res.json())
//     .then(data => console.log(data.articles))

//>>>>>>>> ТО же самое но делаем переменные(типа красивый код)
const url = 'http://newsapi.org/v2/top-headlines?country=ua&q='
let findNews = '19'
const key = '&apiKey=9612ce51c4354d579a8c97e2de8f4083'
fetch(`${url}${findNews}${key}`)
    .then(res => res.json())
    .then(data => console.log(data.articles))

