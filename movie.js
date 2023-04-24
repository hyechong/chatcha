// Landing Section
const landingImg = document.querySelector('.landing-image');

const getLandingImg = async () => {
  fetch('https://yts.mx/api/v2/list_movies.json?limit=1&sort_by=year')
    .then((response) => response.json())
    .then((json) => {
      let bgImg;
      json.data.movies.map((d, i) => {
        bgImg = `
        <img src="${d.background_image_original}"></img>
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
  await fetch('https://yts.mx/api/v2/list_movies.json?limit=4&sort_by=date')
    .then((response) => response.json())
    .then((json) => {
      let movieData;
      json.data.movies.map((d, i) => {
        //console.log(d);
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
            <img src="${d.medium_cover_image}" alt="">
          </div>
          <div class="item-info">
            <h4>${d.title}</h4>
            <div class="rate">
              <i class="ri-star-fill"><span>${d.rating}</span></i>
              <i class="ri-eye-fill"><span>2.3m</span></i>
            </div>
          </div>
        </div>
        `;
        popularSlider.innerHTML += movieData;
      });
    })
    .catch((error) => console.log(error));
};

getpopularImg();

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
