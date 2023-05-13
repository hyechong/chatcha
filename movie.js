const API_KEY = 'api_key=bb7689db4fddee63af4a1305d8ed162d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const getImageUrl = 'https://image.tmdb.org/t/p/original';
// const searchUrl = BASE_URL + '/search/movies?' + API_KEY;

// function getMovieDatas(url) {
//   fetch(url)
//     .then((response) => response.json())
//     .then((json) => {});
// }

// getMovieDatas(API_URL);
// // Search
// const form = document.querySelector('.search-form');
// const search = document.querySelector('.search');

// form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const searchTerm = search.value;

//   if (searchTerm) {
//     getMovieDatas(searchUrl + '&query=' + searchTerm);
//   }
// });

// Landing Section
const landingImg = document.querySelector('.landing-image');

const getLandingImg = async () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((json) => {
      let bgImg;
      json.results.map((d, i) => {
        bgImg = `
       <img src="${getImageUrl + d.backdrop_path}"></img>
       `;
        landingImg.innerHTML = bgImg;
      });
    })
    .catch((error) => console.log(error));
};

getLandingImg();

// Most Popular Section
const popularSlider = document.querySelector('.slider-wrapper');

const getpopularImg = async () => {
  await fetch(API_URL)
    .then((response) => response.json())
    .then((json) => {
      let movieData;
      json.results.map((d, i) => {
        console.log(d.poster_path);
        movieData = `
       <div class="item">
         <div class="item-image">
           <div class="hover">
            <a href="#" class="common-btn detail-btn"><i class="ri-play-fill"></i>&nbsp Trailer</a>
           </div>
           <img src="${getImageUrl + d.poster_path}" alt="">
         </div>
         <div class="item-info">
           <h4>${d.title}</h4>
           <div class="rate">
             <i class="ri-star-fill"><span>${d.vote_average}</span></i>
             <i class="ri-eye-fill"><span>${Math.floor(d.popularity)}</span></i>
           </div>
         </div>
       </div>
       `;
        popularSlider.innerHTML += movieData;
      });
      getMovies();
    })
    .catch((error) => console.log(error));
};

getpopularImg();

function getMovies() {
  console.log($('.item'));
  $('.slider-wrapper').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: $('.next'),
    prevArrow: $('.prev'),
  });
}

const ratingLib = document.querySelector('.rating-wrapper');

const getratingImg = async () => {
  await fetch(API_URL)
    .then((response) => response.json())
    .then((json) => {
      let ratingData;
      json.results.map((d, i) => {
        //console.log(d);
        ratingData = `
       <ul class="rating-item">
         <li class="poster"><img src="${
           getImageUrl + d.poster_path
         }" alt=""></li>
         <li class="movie-info"><h4>${d.title}</h4> <span>${d.release_date},${
          d.genre_ids
        }</span></li>
         <li class="directors"><h4>Directors</h4><span>Lee Unkrich, Adrian Molina</span></li>
         <li class="actors"><h4>Actors</h4><span>Anthony Gonzalez, Gael Garcia Bernal</span></li>
         <li class="my-rate"><i class="ri-star-fill active"></i><i class="ri-star-fill active"></i><i class="ri-star-fill active"></i><i class="ri-star-fill active"></i><i class="ri-star-fill"></i>
         </li>
       </ul> 
       `;
        ratingLib.innerHTML += ratingData;
      });
    })
    .catch((error) => console.log(error));
};

getratingImg();
