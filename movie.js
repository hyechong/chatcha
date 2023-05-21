const API_KEY = 'api_key=bb7689db4fddee63af4a1305d8ed162d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const getImageUrl = 'https://image.tmdb.org/t/p/original';
// const searchUrl = BASE_URL + '/search/movies?' + API_KEY;

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
        // console.log(d.poster_path);
        // console.log(d);
        movieData = `
       <div class="item">
         <div class="item-image">
           <div class="hover">
            <a href="#" class="common-btn trailer-btn" id="${
              d.id
            }"><i class="ri-play-fill"></i>&nbsp Trailer</a>
           </div>
           <img src="${getImageUrl + d.poster_path}" alt="">
         </div>
         <div class="item-text">
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
      trailerOverlay(json);
    })
    .catch((error) => console.log(error));
};

getpopularImg();

function trailerOverlay(popularJsonData) {
  const popularData = document.querySelectorAll('.trailer-btn');
  // console.log(popularData);
  // console.log(popularJsonData);
  popularData.forEach((data, i) => {
    data.addEventListener('click', function (e) {
      e.preventDefault();
      alert(popularJsonData.results[i].id);
    });
  });
}

function getMovies() {
  // console.log($('.item'));
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

const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];
const genresBtnsWrapper = document.querySelector('.genres-btn-wrapper');

let selectedGenre = [];

handleGenre();
function handleGenre() {
  genresBtnsWrapper.innerHTML = '';
  genres.forEach((genre) => {
    const genreEl = document.createElement('button');
    genreEl.classList.add('genres-btn', 'common-btn');
    genreEl.id = genre.id;
    genreEl.innerText = genre.name;
    // console.log(genre.name);
    // genreEl = `<button class="genres-btn common-btn " id="${genre.id}">${genre.name}</button>`;
    // genresBtnsWrapper.innerHTML += genreEl;
    genreEl.addEventListener('click', () => {
      if (selectedGenre == 0) {
        selectedGenre.push(genre.id);
        genreEl.classList.add('on');
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
              genreEl.classList.remove('on');
            }
          });
        } else {
          selectedGenre.push(genre.id);
          genreEl.classList.add('on');
        }
      }
      // console.log(selectedGenre.join());

      getMovieDatas(API_URL + '&with_genres=' + selectedGenre.join());
      // console.log(API_URL + '&with_genres=' + selectedGenre.join());
    });
    genresBtnsWrapper.append(genreEl);
  });
}

getMovieDatas(API_URL);

function getMovieDatas(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showMovies(data.results);
    });
}

const genrePanel = document.querySelector('.genre-items-wrapper');
function showMovies(data) {
  genrePanel.innerHTML = ''; // 하단에 중복으로 쌓이는 오류 해결

  // console.log(data);
  data.forEach((movie) => {
    const {
      title,
      poster_path,
      vote_average,
      popularity,
      id,
      release_date,
      genre_ids,
    } = movie;
    const genreItem = document.createElement('div');
    genreItem.classList.add('item');
    genreItem.innerHTML = `
      
      <div class="item-image">
        <div class="hover">
        <a href="#" class="common-btn trailer-btn" id="${id}"><i class="ri-play-fill"></i>&nbsp Trailer</a>
        </div>
        <img src="${getImageUrl + poster_path}" alt="">
      </div>
      <div class="item-text">
        <h4>${title}</h4>
        <div class="rate">
          <span>${release_date}</span>
        <i class="ri-star-fill"><span>${vote_average}</span></i> 
      </div>
      
     `;
    genrePanel.appendChild(genreItem);

    // document.getElementById(id).addEventListener('click', () => {
    //   console.log(id);
    // });
  });
}

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
