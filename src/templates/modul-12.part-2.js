
import articlesTempl from './articles.hbs'
// console.log(articlesTempl);
const refs ={
  articlesContainer: document.querySelector('.articles-two-js'),
  searchForm: document.querySelector('.search-form-two-js'),
  getImg() {
   return document.querySelectorAll('.list-articles img')
  },

}



refs.searchForm.addEventListener('submit', getValue)

function getValue(e) {
  e.preventDefault()
let inputValue = e.target[0].value
  refs.searchForm.reset()
  fetchArticles(inputValue)
  refs.articlesContainer.innerHTML = ''
  
}

function fetchArticles(inputValue) {
const url = 'https://newsapi.org/v2/everything?q='
const key = '&apiKey=9612ce51c4354d579a8c97e2de8f4083'
fetch(`${url}${inputValue}${key}`)
    .then(response => response.json())
    .then(data => {
        const markup = articlesTempl(data.articles)
      refs.articlesContainer.insertAdjacentHTML('beforeend', markup)
      addImgNotFound()
    })
}

function addImgNotFound() {
       refs.getImg().forEach(el => {  //Ищу все картинки добавленные с АРІ и перебираи их forEach
       if (!el.getAttribute('src')) {  // Если у картинки src пустой 
        el.setAttribute('src', 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png') //Добавляю картинку по умолчанию
       }
     });
}