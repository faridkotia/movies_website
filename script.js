const API_KEY='api_key=3ee05cb2e063b04557e3222c5fc5be4e';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURl = BASE_URL + '/search/movie?'+API_KEY;
const div=document.getElementById('movie_area');
const form=document.getElementById('form');
const search=document.getElementById('search');

get_Movies(API_URL);
function get_Movies(url)
{
    fetch(url).then(res=>res.json()).then(data=>{
        console.log(data.results);
        disp_Movies(data.results);
    })
}

function disp_Movies(data)
 {
    data.forEach(movie =>{
            const container = document.querySelector('.movie_area');
            const {title,poster_path,vote_average}=movie;
            const carde=document.createElement('div');
            carde.classList.add('movie');
            carde.innerHTML=`
            <img src="${IMG_URL+poster_path}" alt=${title}>
        <div class="info">
          <h3>${title}</h3>
          <span class="rating">${vote_average}</span>         
        </div>
        <div class="category">
          <h3>Category</h3>
          <div class="stars">
          ${getStarRating(vote_average)}</div></div>
          
            `
            container.appendChild(carde);
        })
    }


form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const searchItem=search.value;
    if(searchItem)
    {
        get_Movies(searchURl+'&query='+searchItem)
    }
    else
    {
        get_Movies(API_URL);
    }
})




function getStarRating(rating) {
    const maxRating = 5;
    const rate=rating/2;
    const roundedRating = Math.round(rate);
    let stars = '';
  
    for (let i = 1; i <= maxRating; i++) {
      if (i <= roundedRating) {
        stars += '<img src="images/Vector.png" >';}
       else {
        stars += '<img src="images/Vectorblank_star-2.png" alt="star">';
      }
    }
  
    return stars;
  }