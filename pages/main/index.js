// смена цвета кнопки submit с неактивного на valid/invalid при фокусе на форме
const form = document.querySelector('.subscribe-container');
form.addEventListener('focusin', () => {
  form.classList.add('subscribe-form')
});

// открытие поп-ап-меню
const openBurMenu = document.querySelector('.header-nav-container');
const BurMenuBtn = document.querySelector('.burger-menu-btn');

BurMenuBtn.addEventListener('click', (e) => {
  openBurMenu.classList.add('menu-open');
  e.stopPropagation();
});

// карусель в блоке Pets
const pets = [
  {
    name: 'Giant Pandas',
    img: 'foto-card1.webp',
    area: 'Native to Southwest China',
    food: 'herbivorous'
  },
  {
    name: 'Eagles',
    img: 'foto-card2.webp',
    area: 'Native to South America',
    food: 'predator'
  },
  {
    name: 'Gorillas',
    img: 'foto-card3.webp',
    area: 'Native to Congo',
    food: 'herbivorous'
  },
  {
    name: 'Two-toed Sloth',
    img: 'foto-card4.webp',
    area: 'Mesoamerica, South America',
    food: 'herbivorous'
  },
  {
    name: 'Cheetahs',
    img: 'foto-card5.webp',
    area: 'Native to Africa',
    food: 'predator'
  },
  {
    name: 'Alligators',
    img: 'alligator.webp',
    area: 'Native to Southeastern U. S.',
    food: 'predator'
  },
  {
    name: 'Penguins',
    img: 'foto-card6.webp',
    area: 'Native to Antarctica',
    food: 'predator'
  },
  {
    name: 'Giraffe',
    img: 'zhiraf.webp',
    area: 'Native to South Africa',
    food: 'herbivorous'
  },
  {
    name: 'Lion',
    img: 'photo-card7.webp',
    area: 'Native to Africa',
    food: 'predator'
  },
  {
    name: 'Ara',
    img: 'photo-card8.webp',
    area: 'Native to Brazil',
    food: 'herbivorous'
  },
];

let countCards = window.matchMedia('(max-width: 999px)').matches ? 4 : 6;
let isEnabled = true;

function previousSlide() {
  hideSlide('to-right');
  showSlide('from-left', setPrevSlide);
};

function nextSlide() {
  hideSlide('to-left');
  showSlide('from-right', setNextSlide);
};

document.querySelector('.btn-left').addEventListener('click', function() {
  if (isEnabled) {
    previousSlide();
  }
});

document.querySelector('.btn-rigth').addEventListener('click', function() {
  if (isEnabled) {
    nextSlide();
  }
});

function hideSlide(direction) {
  isEnabled = false;
  const activeSlide = document.querySelector('.slide-activ');
  activeSlide.classList.add(direction);
  activeSlide.addEventListener('animationend', function() {
    this.remove();
  })
};

function showSlide(direction, setSlide) {
  setSlide(direction);
  document.querySelector(`.${direction}`).addEventListener('animationend', function() {
    this.classList.remove('slide-next', direction);
    this.classList.add('slide-activ')
    isEnabled = true;
  });
};

function setPrevSlide(direction) {
  let div = document.createElement('div');
  div.className = `slide slide-next ${direction}`;
  div.innerHTML = generateHtmlPets();
  document.querySelector('.slide-activ').before(div);
};

function setNextSlide(direction) {
  let div = document.createElement('div');
  div.className = `slide slide-next ${direction}`;
  div.innerHTML = generateHtmlPets();
  document.querySelector('.slide-activ').after(div);
};

function generateHtmlPets() {
  let shuffledPets = shuffle(pets);
  let htmlPets = '';
  for (let i = 0; i < countCards; i++) {
    htmlPets += `<section class="pets-card ${shuffledPets[i].food}">
    <img class="pet-img" src="../../assets/imgs/${shuffledPets[i].img}" alt="${shuffledPets[i].name}">
    <h5 class="animal-name">${shuffledPets[i].name}</h5>
    <p class="animal-area">${shuffledPets[i].area}</p>
    </section>`
  };
  return htmlPets;
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  };
  return array;
};

//Карусель в блоке Testimonials
const testimonials = document.querySelector('.testimonials-wrap');
const scrollbar = document.querySelector('.testimonials-scrollbar');
let translateX = window.matchMedia('(max-width: 1220px)').matches ? 322 : 297;

if(window.matchMedia('(max-width: 1220px)').matches) {
  scrollbar.max = 8;
}

function setPosition(event) {
  let attrValue = `transform: translateX(-${event.target.value * translateX}px);`;
  testimonials.style = attrValue;
}

scrollbar.addEventListener('input', setPosition);

//Попап при нажатии на отзыв в блоке Testimonials

if(window.matchMedia('(max-width: 980px)').matches) {
  testimonials.addEventListener('click', setTestimonialPopup)
};

function setTestimonialPopup(event) {
  if (!document.querySelector('.testimonial-pop-up')) {
    if(event.target.closest('.testimonial')) {
      let testimonialPopup = event.target.closest('.testimonial').cloneNode(true);
      testimonialPopup.classList.add('testimonial-pop-up');
      testimonialPopup.innerHTML += '<div class="testimonial-close-btn"></div>';
      event.currentTarget.after(testimonialPopup);
      testimonialPopup.classList.add('testimonial-pop-up-open');
      event.stopPropagation();
    }
  }
};

function closeTestimonialPopup(event) {
  let testimonialPopup = document.querySelector('.testimonial-pop-up');
  testimonialPopup.classList.add('testimonial-pop-up-close');
  testimonialPopup.classList.remove('testimonial-pop-up-open');
  document.querySelector('.testimonial-pop-up-close').addEventListener('animationend', () => {
    testimonialPopup.remove();
    event.stopPropagation();
  })
};

// Закрытие попапов меню и Testimonials
document.addEventListener('click', e => {
  if (!e.target.closest('.header-nav-container') && openBurMenu.classList.contains('menu-open')
    || e.target.classList.contains('burger-menu-close')
    || e.target.closest('a') && openBurMenu.classList.contains('menu-open')
  ) {
    openBurMenu.classList.remove('menu-open')
  };

  if (
    e.target.classList.contains('testimonial-close-btn') ||
    document.querySelector('.testimonial-pop-up') &&
    !e.target.closest('.testimonial-pop-up')
  ) {
    e.preventDefault();
    closeTestimonialPopup(e);
  }
});