
import articlesTempl from './articles.hbs'
// console.log(articlesTempl);
const refs ={
  articlesContainer: document.querySelector('.articles-two-js'),
  searchForm: document.querySelector('.search-form-two-js'),
  getImg() {
   return document.querySelectorAll('.list-articles img')
  },
  btnLoadMore: document.querySelector('[data-action="load-more"]'),

}
let page = 1
let btnLoadMoreIsActive = false



refs.searchForm.addEventListener('submit', getValue)

function getValue(e) {
  e.preventDefault()
  let inputValue = e.target[0].value
  if (!inputValue) {
    return
  }
  refs.searchForm.reset()
  page = 1
  fetchArticles(inputValue)
  refs.articlesContainer.innerHTML = ''
  refs.btnLoadMore.classList.remove('is-hidden')

  if (!btnLoadMoreIsActive) {
    btnLoadMoreIsActive = true
    refs.btnLoadMore.addEventListener('click', () => {
      page += 1
      fetchArticles(inputValue)
    })
  }
}
function fetchArticles(inputValue) {
const url = 'https://newsapi.org/v2/everything?q='
const key = `&apiKey=9612ce51c4354d579a8c97e2de8f4083&pageSize=10&page=${page}`
fetch(`${url}${inputValue}${key}`)
    .then(response => response.json())
    .then(data => {
        const markup = articlesTempl(data.articles)
      refs.articlesContainer.insertAdjacentHTML('beforeend', markup)
      addImgNotFound()
      // page+=1
    })
}

function addImgNotFound() {
       refs.getImg().forEach(el => {  //Ищу все картинки добавленные с АРІ и перебираи их forEach
       if (!el.getAttribute('src')) {  // Если у картинки src пустой 
        el.setAttribute('src', 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png') //Добавляю картинку по умолчанию
       }
     });
}

