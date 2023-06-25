const API_KEY = 'api_key=bb7689db4fddee63af4a1305d8ed162d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const getImageUrl = 'https://image.tmdb.org/t/p/original';
const searchUrl = BASE_URL + '/search/movie?query=';

// Search
const searchBtn2 = document.querySelector('.search-btn');
const mobileSearchBtn2 = document.querySelector('.mobile-search-btn');

searchBtn2.addEventListener('click', function () {
  const keyValue = document.querySelector('.search-input').value;
  if (keyValue == '' || null || undefined) {
    alert('Please insert search value!');
  } else {
    location.href = `/chatcha/search.html?search=${keyValue}`;
  }
});

mobileSearchBtn2.addEventListener('click', function () {
  const keyValue = document.querySelector('.mobile-search-input').value;
  if (keyValue == '' || null || undefined) {
    alert('Please insert search value!');
  } else {
    location.href = `/chatcha/search.html?search=${keyValue}`;
  }
});

const searchValue = new URLSearchParams(location.search).get('search');

getMovieDatas(searchUrl + searchValue + '&' + API_KEY);

function getMovieDatas(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showMovies(data.results);
      trailerOverlay(data);
    });
}

const searchResultsWrapper = document.querySelector('.search-results-wrapper');
function showMovies(data) {
  console.log(data);
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
    const searchResultItem = document.createElement('div');
    searchResultItem.classList.add('item', 'search-result-item');
    searchResultItem.innerHTML = `
      
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
        <i class="ri-star-fill"><span>${vote_average.toFixed(2)}</span></i> 
      </div>
      
     `;
    searchResultsWrapper.appendChild(searchResultItem);
  });
}

// Trailer Overlay
function trailerOverlay(popularJsonData) {
  const popularData = document.querySelectorAll('.trailer-btn');

  popularData.forEach((data, i) => {
    data.addEventListener('click', function (e) {
      e.preventDefault();
      openTrailerOverlay(data);
    });
  });
}

const trailerVideoWrapper = document.querySelector(
  '.trailer-overlay .video-wrapper'
);
const trailerTextWrapper = document.querySelector(
  '.trailer-overlay .txt-wrapper'
);

function openTrailerOverlay(data) {
  let id = data.id;
  fetch(BASE_URL + '/movie/' + id + '?' + API_KEY)
    .then((response) => response.json())
    .then((infoData) => {
      let movieInfo;
      // console.log(infoData.title);
      movieInfo = `
        <div class="movie-info">
          <h4>${infoData.title}</h4>
          <span>${infoData.release_date}</span>
        </div>
        <div class="overview">
          <p>
            ${infoData.overview}
          </p>
        </div>
      `;

      trailerTextWrapper.innerHTML = movieInfo;
    });

  fetch(BASE_URL + '/movie/' + id + '/videos?' + API_KEY, {
    mode: 'cors',
  })
    .then((res) => res.json())
    .then((videoData) => {
      // console.log(videoData);
      if (videoData) {
        document.querySelector('.trailer-overlay').style.opacity = '100%';
        document.querySelector('.trailer-overlay').style.visibility = 'visible';
        if (videoData.results.length > 0) {
          let embed = [];
          videoData.results.forEach((video) => {
            let { name, key, site, type } = video;

            if (site == 'YouTube' && type == 'Trailer') {
              embed.push(`
                <iframe src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              `);
            }
          });
          trailerVideoWrapper.innerHTML = embed.join('');
          activeSlide = 0;
          showVideos();
        } else {
          trailerVideoWrapper.innerHTML = `<h2 class="no-results">No Results Found</h2>`;
        }
      }
    });
}

const trailerCloseBtn = document.querySelector('.trailer-overlay .close-icon');
trailerCloseBtn.addEventListener('click', closeTrailerOverlay);

function closeTrailerOverlay(e) {
  e.preventDefault();
  document.querySelector('.trailer-overlay').style.opacity = '0';
  document.querySelector('.trailer-overlay').style.visibility = 'hidden';
  trailerVideoWrapper.replaceChildren(); // overlay 꺼도 영상 재생되는 오류 해결
}

let activeSlide = 0;
function showVideos() {
  let embedClasses = document.querySelectorAll('.embed');
  embedClasses.forEach((embedTag, idx) => {
    if (activeSlide == idx) {
      embedTag.classList.add('show');
      embedTag.classList.remove('hide');
    } else {
      embedTag.classList.add('hide');
      embedTag.classList.remove('show');
    }
  });
}
