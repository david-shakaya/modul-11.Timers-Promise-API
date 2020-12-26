import articlesTempl from './articles.hbs'
// console.log(articlesTempl);
const refs ={
  articlesContainer:document.querySelector('.articles-two-js'),
}


const url = 'https://newsapi.org/v2/everything?q='
const inputValue = 'covid-19'
const key = '&apiKey=9612ce51c4354d579a8c97e2de8f4083'
fetch(`${url}${inputValue}${key}`)
    .then(response => response.json())
    .then(data => {
        const markup = articlesTempl(data.articles)
        refs.articlesContainer.insertAdjacentHTML('beforeend',markup)
    })

 
