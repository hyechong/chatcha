/* -------- Header Hide & Show -------- */
let prevScrollpos = window.pageYOffset; //재할당되므로 let으로 정의
const header = document.querySelector('#header');

window.addEventListener('scroll', function () {
  const currentScrollPos = window.pageYOffset;
  if (currentScrollPos > 150) {
    if (prevScrollpos > currentScrollPos) {
      // show header
      header.style.top = 0;
    } else {
      // hide header
      header.style.top = -100 + '%';
    }
    prevScrollpos = currentScrollPos; // 마우스 이동 후 스크롤 위치값 재할당
  }
});
/* -------- to top button -------- */
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

/* -------- Mobile Menu Hide & Show -------- */
const mobileMenuIcon = document.querySelector('.menu-icon');
const mobileOverlay = document.querySelector('.mobile-overlay');
const mobileCloseIcon = document.querySelector('.close-icon');

mobileMenuIcon.addEventListener('click', function (e) {
  e.preventDefault(); // 기본 기능 막아주는 함수 (여기서는 <a href="#"> a 누르면 화면 맨위로 기본 기능 막아줌)
  mobileOverlay.classList.add('on');
  document.body.style.overflow = 'hidden'; // 사이드 메뉴 활성화시 스크롤 멈춤
});
mobileCloseIcon.addEventListener('click', function (e) {
  e.preventDefault();
  mobileOverlay.classList.remove('on');
  document.body.style.overflow = 'auto'; // 사이드 메뉴 닫으면 다시 스크롤 가능
});

// target, currentTarget
mobileOverlay.addEventListener('click', function (e) {
  // console.log(e.target); // 클릭한 element 타겟팅
  // console.log(e.currentTarget); // 최상위 element 타겟팅
  if (
    e.target.getAttribute('class') !== 'mobile-menus' &&
    // e.target.nodeName !== 'LI' &&
    // e.target.nodeName !== 'A' &&
    // e.target.nodeName !== 'IMG' &&
    e.target.nodeName !== 'INPUT'
  ) {
    mobileOverlay.classList.remove('on');
    document.body.style.overflow = 'auto';
  }
});
