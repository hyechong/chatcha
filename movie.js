const API_KEY = 'bb7689db4fddee63af4a1305d8ed162d';

// Landing Section
const landingImg = document.querySelector('.landing-image');
const getImageUrl = 'https://image.tmdb.org/t/p/original';

const getLandingImg = async () => {
  fetch(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=bb7689db4fddee63af4a1305d8ed162d'
  )
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
  await fetch(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=bb7689db4fddee63af4a1305d8ed162d'
  )
    .then((response) => response.json())
    .then((json) => {
      let movieData;
      json.results.map((d, i) => {
        console.log(d.poster_path);
        movieData = `
       <div class="item">
         <div class="item-image">
           <div class="hover">
             <button class="bookmark">
               <i class="ri-heart-fill"></i>
             </button>
             <a href="#"><i class="ri-play-fill"></i>&nbsp Play Now</a>
             <a href="#"><i class="ri-share-fill"></i>&nbsp Share</a>
           </div>
           <img src="${getImageUrl + d.poster_path}" alt="">
         </div>
         <div class="item-info">
           <h4>${d.title}</h4>
           <div class="rate">
             <i class="ri-star-fill"><span>${d.vote_average}</span></i>
             <i class="ri-eye-fill"><span>${d.vote_count}</span></i>
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
  await fetch('https://yts.mx/api/v2/list_movies.json?limit=3&sort_by=date')
    .then((response) => response.json())
    .then((json) => {
      let ratingData;
      json.data.movies.map((d, i) => {
        //console.log(d);
        ratingData = `
       <ul class="rating-item">
         <li class="poster"><img src="${d.small_cover_image}" alt=""></li>
         <li class="movie-info"><h4>${d.title}</h4> <span>${d.year},${d.genres}</span></li>
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
