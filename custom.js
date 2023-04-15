//to top button
const header = document.querySelector('#header');
const toTop = document.querySelector('.top');

window.addEventListener('scroll', function () {
  const scrY = window.scrollY;
  if (scrY > 60) {
    toTop.style.display = 'flex';
  } else {
    toTop.style.display = 'none';
  }
});

toTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

//bookmark button
const bookmarkBtns = document.querySelectorAll('.bookmark');

bookmarkBtns.forEach(function (btns) {
  btns.addEventListener('click', function () {
    btns.classList.toggle('active');
  });
});
