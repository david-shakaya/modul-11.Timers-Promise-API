
import articlesTempl from './articles.hbs'
// console.log(articlesTempl);
const refs ={
  articlesContainer: document.querySelector('.articles-two-js'),
  searchForm: document.querySelector('.search-form-two-js'),
  getImg() {
   return document.querySelectorAll('.list-articles img')
  },
  btnLoadMore: document.querySelector('[data-action="load-more"]'),
  btnSpiner: document.querySelector('.spiner-js'),
  
}
let page = 1
let btnLoadMoreIsActive = false
let searchQuery = ''



refs.searchForm.addEventListener('submit', getValue)

function getValue(e) {
  e.preventDefault()
  searchQuery = e.target[0].value
  if (!searchQuery) {
    return
  }
  refs.searchForm.reset()
  page = 1
  fetchArticles(searchQuery)
  refs.articlesContainer.innerHTML = ''
  refs.btnLoadMore.classList.remove('is-hidden')
         // свойства кнопки бутстрап
  refs.btnLoadMore.setAttribute('disabled', true)
  refs.btnSpiner.classList.remove('is-hidden')
  
  // refs.btnLoadMore.innerText = 'Загружаем...'

  if (!btnLoadMoreIsActive) {
    btnLoadMoreIsActive = true
    refs.btnLoadMore.addEventListener('click', () => {
      page += 1
      fetchArticles(searchQuery)

               // свойства кнопки бутстрап
  refs.btnLoadMore.setAttribute('disabled', true)
  refs.btnSpiner.classList.remove('is-hidden')
  // refs.btnLoadMore.innerText = 'Загружаем...'
    })
  }
}
function fetchArticles(inputValue) {
const url = 'https://newsapi.org/v2/everything?q='
const key = `&apiKey=9612ce51c4354d579a8c97e2de8f4083&pageSize=4&page=${page}`
fetch(`${url}${inputValue}${key}`)
    .then(response => response.json())
    .then(data => {
        const markup = articlesTempl(data.articles)
      refs.articlesContainer.insertAdjacentHTML('beforeend', markup)
      addImgNotFound()
               // свойства кнопки бутстрап
      refs.btnLoadMore.removeAttribute('disabled')
      // refs.btnLoadMore.textContent
       refs.btnSpiner.classList.add('is-hidden')
    })
}

function addImgNotFound() {
       refs.getImg().forEach(el => {  //Ищу все картинки добавленные с АРІ и перебираи их forEach
       if (!el.getAttribute('src')) {  // Если у картинки src пустой 
        el.setAttribute('src', 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png') //Добавляю картинку по умолчанию
       }
     });
}

